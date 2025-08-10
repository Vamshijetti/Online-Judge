const express = require('express');
const router = express.Router();

const Problem = require('../models/problem');
const Submission = require('../models/Submission');
const { generateFile } = require('../generateFile.js');
const { generateInputFile } = require('../generateInputFile.js');
const { executeCpp } = require('../executeCpp.js');

router.post('/run', async (req, res) => {
    const { language = 'cpp', code, input } = req.body;

    if (!code) {
        return res.status(400).json({
            success: false,
            error: "Empty Code",
        });
    }

    try {
        const filePath = await generateFile(language, code);
        const inputFilePath = await generateInputFile(input);
        const output = await executeCpp(filePath, inputFilePath);

        return res.status(200).json({
            success: true,
            output: output,
        });
    } catch (error) {
        console.error(error);
        if (error.error === "Time limit exceeded") {
            return res.status(408).json({
                success: false,
                error: "Time limit exceeded",
            });
        } else {
            return res.status(500).json({
                success: false,
                error: error.stderr || error.message,
            });
        }
    }
});

router.post('/submit', async (req, res) => {
    try {
        const { problemId, code, language = 'cpp' } = req.body;
        const userId = req.body.userId;
        console.log(userId);
        console.log("reqBody");
        console.log(req.body);
        
        if (!code) {
            return res.status(400).json({
                success: false,
                error: "Empty Code",
            });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({
                success: false,
                error: "Problem does not exist",
            });
        }
        
        let verdict = "Accepted";
        const submission = new Submission({
            problemId,
            code,
            verdict,
            submittedBy: userId,
            submittedAt: Date.now()
        });
        
        const testCases = problem.testCases || [];
        const filePath = await generateFile(language, code);
        console.log("testcases : " + testCases);
        for (const testCase of testCases) {
            const inputPath = await generateInputFile(testCase.input);

            try {
                const output = await executeCpp(filePath, inputPath);
                const expected = testCase.output.trim();
                const actual = output.trim();
                console.log("output " + output);
                console.log("expected : " + expected);
                console.log("actual : " + actual);
                if (actual !== expected) {
                    verdict = "Wrong answer";
                    submission.verdict = verdict;
                    break;
                }
            } catch (error) {
                console.error("Execution error:", error);

                verdict = error === "Time limit exceeded" ? "Time limit exceeded" : `Error: ${error.stderr || error.message}`;
                submission.verdict = verdict;

                await submission.save();
                return res.status(500).json({
                    success: false,
                    error: verdict,
                });
            }
        }

        submission.verdict = verdict;
        await submission.save();
        console.log(submission);
        return res.status(200).json({
            success: true,
            verdict: verdict,
            submission
        });

    } catch (error) {
        console.error("Submission failed:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
