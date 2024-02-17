const express = require('express');
const cors = require('cors');

const app = express();

const adminRoutes = require('./src/routes/admin-routes');
const donationRoutes = require('./src/routes/donation-routes');
const educationRoutes = require('./src/routes/education-routes');
const eventRoutes = require('./src/routes/event-routes');
const experienceRoutes = require('./src/routes/experience-routes');
const feedbackRoutes = require('./src/routes/feedback-routes');
const googleRoutes = require('./src/routes/google-routes');
const mediaRoutes = require('./src/routes/media-routes');
const postRoutes = require('./src/routes/post-routes');
const userRoutes = require('./src/routes/user-routes');


const {verifyToken} = require('./src/middleware/auth-middleware');

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001", "https://bdu-stem-alumni.netlify.app", "http://127.0.0.1:5501/index.html", "https://geo-marked-users.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use('/', adminRoutes);
app.use('/', donationRoutes);
app.use('/', educationRoutes);
app.use('/', eventRoutes);
app.use('/', experienceRoutes);
app.use('/', feedbackRoutes);
app.use('/', googleRoutes);
app.use('/', mediaRoutes);
app.use('/', postRoutes);
app.use('/', userRoutes);

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