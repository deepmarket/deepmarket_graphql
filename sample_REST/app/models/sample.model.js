const mongoose = require('mongoose');

const SampleSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Sample', SampleSchema);
