const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user-routes');

app.use(express.json());

app.use('/', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});