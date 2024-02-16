const express = require('express');
const app = express();

const adminRoutes = require('./src/routes/admin-routes');
const donationRoutes = require('./src/controllers/donation-controller');
const educationRoutes = require('./src/controllers/education-controller');
const eventRoutes = require('./src/controllers/event-controller');
const experienceRoutes = require('./src/controllers/experience-controller');
const feedbackRoutes = require('./src/controllers/feedback-controller');
const googleRoutes = require('./src/controllers/google-controller');
const mediaRoutes = require('./src/controllers/media-controller');
const postRoutes = require('./src/controllers/post-controller');
const userRoutes = require('./src/routes/user-routes');


const {verifyToken} = require('./src/middleware/auth-middleware');

app.use(express.json());

app.use('/', adminRoutes);
app.use('/', donationRoutes);
app.use('/', educationRoutes)
app.use('/', eventRoutes)
app.use('/', experienceRoutes)
app.use('/', feedbackRoutes)
app.use('/', googleRoutes)
app.use('/', mediaRoutes)
app.use('/', postRoutes)
app.use('/', userRoutes)

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