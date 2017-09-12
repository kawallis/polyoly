const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId, 
        ref: 'Project'
    },
    tasks: [
        {
            type: Schema.Types.ObjectId, 
            ref : 'Task'
        }
    ]
});

module.exports = mongoose.model('Member', schema);