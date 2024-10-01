import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Group', groupSchema);
