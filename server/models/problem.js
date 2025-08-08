const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
	name : {
        type : String
    },

    problemStatement : {
        type : String
    },

    testCases : [{
        input: { type: String },
        output: { type: String },
    }],

    createdBy : {
        type : String
    }
})

module.exports = mongoose.model("problem", problemSchema);

// const mongoose = require('mongoose');

// const problemSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     difficulty: {
//         type: String,
//         enum: ['Easy', 'Medium', 'Hard'],
//         required: true
//     },
//     exampleInput: {
//         type: String,
//         required: true
//     },
//     exampleOutput: {
//         type: String,
//         required: true
//     },
//     constraints: {
//         type: [String],
//         required: true
//     },
//     testCases: [
//         {
//             input: String,
//             output: String
//         }
//     ],
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Problem', problemSchema);