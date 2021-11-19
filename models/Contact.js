var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'This email already exist '],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'
        ]
    },
    text: {
        type: String,
    required: [true, 'Please add some text message']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
},
{
     toJSON: { virtuals: true},
    toObject: { virtuals: true}
});


module.exports = mongoose.model('Contact', contactSchema);