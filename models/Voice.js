const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const voiceSchema = new mongoose.Schema({
    author: { type: String, required: true },
    voicename: { type: String, required: true, unique: true },
    note: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    audio: { type: String, required: true },
}, { timestamps: true });



module.exports = mongoose.model('Voice', voiceSchema);
