const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

router.post('/createProblem', async (req, res) => {
    const data = req.body;

    if (!data.isAdmin) {
        return res.status(403).json({ message: "User must be an Admin to access this." });
    }

    const { name, problemStatement, testCases, createdBy } = data.problem;

    try {
        const newProblem = new Problem({
            name,
            problemStatement,
            testCases,
            createdBy
        });

        await newProblem.save();
        return res.status(201).json({ success: true, message: "Problem created successfully." });
    } catch (error) {
        console.error("Problem creation failed:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get('/getAllProblems', async (req, res) => {
    try {
        const problems = await Problem.find({});
        console.log(problems);
        res.status(200).json({ success: true, problems });
    } catch (error) {
        console.error("Failed to fetch problems:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get('/getProblem/:problemId', async (req, res) => {
    try {
        const { problemId } = req.params;
        const problem = await Problem.findById(problemId);
        console.log(problem);

        if (!problem) {
            return res.status(404).json({ success: false, message: 'Problem not found' });
        }

        res.status(200).json({ success: true, problem });
    } catch (error) {
        console.error('Failed to fetch problem:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;