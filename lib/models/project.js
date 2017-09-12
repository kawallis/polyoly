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
    members: [
        { 
            type: Schema.Types.ObjectId, 
            ref : 'Member' 
        }
    ]
    
});

module.exports = mongoose.model('Project', schema);