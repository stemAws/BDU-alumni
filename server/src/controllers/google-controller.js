const passport = require('../config/passport-config');
const db = require('../config/db');
const jwt = require("jsonwebtoken");


exports.authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/failed', successRedirect: '/profile' });

exports.failed = async (req, res) => {
    res.redirect(`http://localhost:5173/`);
};

exports.profile = async (req, res) => {
    console.log(req.user.emails[0].value)
    try {
        const [result] = await db.query('SELECT personId FROM Person WHERE email = ?', [req.user.emails[0].value]);
        let token = result[0].personId

        if (result.length > 0) {
            const realToken = jwt.sign({token}, process.env.secretKey, {
                expiresIn: "30d",
            });
      
            res.cookie('token', realToken, { httpOnly: true }).cookie('id', token, { httpOnly: true });

            res.redirect(`http://localhost:5173/`);
        }
    } catch (error) {
        console.error(error);
        res.redirect(`http://localhost:5173/email_not_registered_IN_OUR_DB`);
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};