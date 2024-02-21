const express = require('express');
const cors = require('cors');
const {verifyToken} = require('./src/middleware/auth-middleware');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://geo-marked-users.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.post('/verify-token', verifyToken, (req, res) => {
  res.status(200);
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});