require('dotenv').config();
const express = require('express');
const cors = require('cors');
const classifyRouter = require('./routes/classify.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/classify-url', classifyRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;