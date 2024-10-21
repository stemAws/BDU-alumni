const passport = require('../config/passport-config');
const db = require('../config/db');
const jwt = require("jsonwebtoken");
const alumniService = require("../services/user-services");


exports.authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/failed', successRedirect: '/profile' });

exports.failed = async (req, res) => {
    res.redirect(`http://localhost:5173/`);
};

exports.profile = async (req, res) => {
    console.log(req.user.emails[0].value)
    try {
        const [result] = await db.query('SELECT username FROM Person WHERE email = ?', [req.user.emails[0].value]);
        const token = await alumniService.getAlumniProfile(result[0].username);
        console.log(token)
        const { alumniId: id2 } = token[0];
        const { personId: id} =  token[0];
        console.log(id)
        if (result.length > 0) {
            const realToken = jwt.sign({token}, process.env.secretKey, {
                expiresIn: "30d",
            });

            const isProd = process.env.NODE_ENV === 'prod';
            const httpOnlyFlag = isProd;

      
            res.cookie('token', realToken, { httpOnly: httpOnlyFlag }).cookie('id', id, { httpOnly: httpOnlyFlag }).cookie('id2', id2);

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