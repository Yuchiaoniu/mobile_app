const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const treeRoutes = require('./routes/treeRoutes');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/trees', treeRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
