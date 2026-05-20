const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        production: { type: String, required: true },
        image: { type: String, required: true },
        venue: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        preSale: { type: String, required: false },
        doorCharge: { type: String, required: true },
        isPublished: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Gig || mongoose.model('Gig', gigSchema);