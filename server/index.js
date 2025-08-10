const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { aiCodeReview } = require('./aiCodeReview');

dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/auth'));
app.use('/problems', require('./controllers/problemController'));
app.use('/', require('./controllers/codeController'));
app.use('/', require('./controllers/submissionController'));

app.post("/ai-review", async (req, res) => {
    const { code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const review = await aiCodeReview(code);
        res.json({ "review": review });
    } catch (error) {
        res.status(500).json({ error: "Error in AI review, error: " + error.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
