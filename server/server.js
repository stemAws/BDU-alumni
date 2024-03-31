const express = require('express')
const cors = require('cors')
const {notFound, errorHandler} = require('./src/middleware/error-middleware')
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('./src/config/passport-config')


PORT = process.env.PORT || 3005,

app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://geo-marked-users.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./src/routes/admin-routes'));
app.use('/', require('./src/routes/donation-routes'));
app.use('/', require('./src/routes/education-routes'));
app.use('/', require('./src/routes/event-routes'));
app.use('/', require('./src/routes/experience-routes'));
app.use('/', require('./src/routes/feedback-routes'));
app.use('/', require('./src/routes/google-routes'));
app.use('/', require('./src/routes/media-routes'));
app.use('/', require('./src/routes/post-routes'));
app.use('/', require('./src/routes/user-routes'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});