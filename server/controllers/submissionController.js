const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// GET /submissions/:userId/:problemId
router.get('/submissions/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const submissions = await Submission.find({ submittedBy: userId });

        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this user ' });
        }

        res.status(200).json({ success: true, submissions });
    } catch (error) {
        console.error('Error fetching submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
