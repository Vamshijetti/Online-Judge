const fs = require('fs');
const { exec, spawn } = require("child_process");
const path = require('path');

const outputPath = path.join(__dirname, 'outputsOfCode');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputFilePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outputFileName = `${jobId}.exe`;
    const exePath = path.join(outputPath, outputFileName);

    return new Promise((resolve, reject) => {
        const compileCommand = `g++ "${filePath}" -o "${exePath}"`;

        exec(compileCommand, (compileErr, _, compileStderr) => {
            if (compileErr || compileStderr) {
                return reject({ error: "Compilation failed", stderr: compileStderr });
            }
            const child = spawn(exePath, [], {
                stdio: ["pipe", "pipe", "pipe"]
            });

            const input = fs.readFileSync(inputFilePath, "utf-8");
            child.stdin.write(input);
            child.stdin.end();

            let output = "";
            let error = "";

            child.stdout.on("data", (data) => {
                output += data.toString();
            });

            child.stderr.on("data", (data) => {
                error += data.toString();
            });

            const timeout = setTimeout(() => {
                child.kill();
                reject({ error: "Time limit exceeded", stderr: "" });
            }, 5000);

            child.on("close", (code) => {
                clearTimeout(timeout);
                if (code !== 0) {
                    reject({ error: "Execution error", stderr: error });
                } else {
                    resolve(output);
                }
            });
        });
    });
};

module.exports = {
    executeCpp,
};
