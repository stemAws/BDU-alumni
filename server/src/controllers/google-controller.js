const passport = require('../config/passport-config');
const db = require('../config/db');

exports.authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/failed', successRedirect: '/profile' });

exports.failed = async (req, res) => {
    res.redirect(`http://localhost:3000/`);
};

exports.profile = async (req, res) => {
    try {
        console.log(req.user.emails[0].value);
        const [result] = await db.query('SELECT alumniID FROM alumni WHERE email = ?', [req.user.emails[0].value]);
        console.log(result[0].alumniID);

        if (result.length > 0) {
            const token = result;
            res.redirect(`http://localhost:3000/?${token[0].alumniID}`);
        }
    } catch (error) {
        console.error(error);
        res.redirect(`http://localhost:3000/`);
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};