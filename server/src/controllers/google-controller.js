const passport = require("../config/passport-config");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const alumniService = require("../services/user-services");

exports.authenticateGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleCallback = passport.authenticate("google", {
  failureRedirect: "/failed",
  successRedirect: "/profile",
});

exports.failed = async (req, res) => {
  res.redirect(`http://localhost:5173/`);
};

// exports.profile = async (req, res) => {
//     console.log(req.user.emails[0].value)
//     try {
//         const [result] = await db.query('SELECT username FROM Person WHERE email = ?', [req.user.emails[0].value]);
//         const token = await alumniService.getAlumniProfile(result[0].username);
//         console.log(token)
//         const { alumniId: id2 } = token[0];
//         const { personId: id} =  token[0];
//         console.log(id)
//         if (result.length > 0) {
//             const realToken = jwt.sign({token}, process.env.secretKey, {
//                 expiresIn: "30d",
//             });

//             const isProd = process.env.NODE_ENV === 'prod';
//             const httpOnlyFlag = isProd;

//             res.cookie('token', realToken, { httpOnly: httpOnlyFlag }).cookie('id', id, { httpOnly: httpOnlyFlag }).cookie('id2', id2);

//             res.redirect(`http://localhost:5173/`);
//         }
//     } catch (error) {
//         console.error(error);
//         res.redirect(`http://localhost:5173/email_not_registered_IN_OUR_DB`);
//     }
// };
exports.profile = async (req, res) => {
  const email = req.user.emails[0].value;
  try {
    // Get user details from DB
    const user = await alumniService.getAlumniByEmail(email);

    // Handle non-existent users
    if (!user || user.length === 0) {
      return res.redirect(
        `http://localhost:5173/email_not_registered_IN_OUR_DB`
      );
    }

    const { personId: id, status, isAdmin } = user;

    if (status != "Active") {
      return res.redirect(`http://localhost:5173/account_not_activated`);
    }

    // Determine user role (admin or alumni)
    const role = isAdmin ? "admin" : "alumni";

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { id: String(id), role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES } // Short-lived token
    );

    const refreshToken = jwt.sign(
      { id: String(id), role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES } // Long-lived token
    );

    // Set tokens in cookies
    const isProd = process.env.NODE_ENV === "production"; // Check if in production
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend home page
    res.redirect(`http://localhost:5173/`);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    res.redirect(`http://localhost:5173/error`);
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
