const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    memberId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Done', 'On Hold', 'In Progress', 'Sent', 'Schedule']
    }
    
});

module.exports = mongoose.model('Task', schema);