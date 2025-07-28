const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // line 5

dotenv.config();

connectDB(); // line 9 (this is probably the line with the error)

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/auth', require('./routes/auth'));
app.use('/', require('./routes/auth'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
