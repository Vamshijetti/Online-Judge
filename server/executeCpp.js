// const fs = require('fs');
// const { exec } = require("child_process");
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// const outputPath = path.join(__dirname, 'outputsOfCode'); 

// if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath, { recursive: true });
// }

// //filePath -> code/3Sum.vamshi (code which we have written for a problem)
// //inputFilePath -> testcases to run 3sum problem
// const executeCpp = async (filePath, inputFilePath) => {
//     const jobId = path.basename(filePath).split(".")[0];// bhbu ndhvby cfngun
//     const outputFileName = `${jobId}.exe`;
//     const outPath = path.join(outputPath, outputFileName);

//     return new Promise((resolve, reject) => {
//         // const command = `g++ ${filePath} -o ${outPath} && cd ${outputPath} && timeout 50s ./${outputFileName} < ${inputFilePath}`;
//         const command = `g++ ${codePath} -o ${exePath} && cd ${exeDir} && timeout 5s ./${exeName} < ${inputPath}`;

//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 if (error.code === 124) { // Timeout error code
//                     return reject({ error: "Time limit exceeded", stderr });
//                 } else {
//                     return reject({ error, stderr });
//                 }
//             }
//             if (stderr) {
//                 return reject({ error: "Execution error", stderr });
//             }
//             resolve(stdout);
//         });
//     });
// };

// module.exports = {
//     executeCpp,
// };


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
        // Step 1: Compile the C++ code
        const compileCommand = `g++ "${filePath}" -o "${exePath}"`;

        exec(compileCommand, (compileErr, _, compileStderr) => {
            if (compileErr || compileStderr) {
                return reject({ error: "Compilation failed", stderr: compileStderr });
            }

            // Step 2: Run the compiled executable
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

            // Enforce timeout (5 seconds)
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
