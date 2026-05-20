const Gig = require('../models/Gig');
const { isValidObjectId } = require('mongoose');

const getGigs = async (req, res) => {
    try {
        const gigs = await Gig.find().sort({ createdAt: -1 });

        res.json({ gigs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGigById = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid gig ID.' });
        }

        const gig = await Gig.findById(req.params.id);

        if (!gig) {
            return res.status(404).json({ message: 'Gig not found.' });
        }

        res.json({ gig });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createGig = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Gig image is required.' });
        }

        const gig = await Gig.create({
            title: req.body.title,
            production: req.body.production,
            image: `/uploads/gigs/${req.file.filename}`,
            venue: req.body.venue,
            date: req.body.date,
            time: req.body.time,
            preSale: req.body.preSale || '',
            doorCharge: req.body.doorCharge,
            isPublished: req.body.isPublished === 'true' || req.body.isPublished === true,
        });

        res.status(201).json(gig);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateGig = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid gig ID.' });
        }

        const updateData = {
            title: req.body.title,
            production: req.body.production,
            venue: req.body.venue,
            date: req.body.date,
            time: req.body.time,
            preSale: req.body.preSale || '',
            doorCharge: req.body.doorCharge,
            isPublished: req.body.isPublished === 'true' || req.body.isPublished === true,
        };

        if (req.file) {
            updateData.image = `/uploads/gigs/${req.file.filename}`;
        }

        const gig = await Gig.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!gig) {
             return res.status(404).json({ message: 'Gig not found.' });
        }

        res.json(gig);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteGig = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid gig ID.' });
        }

        const gig = await Gig.findByIdAndDelete(req.params.id);

        if (!gig) {
            return res.status(404).json({ message: 'Gig not found.' });
        }
        
        res.json({ message: 'Gig deleted successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getGigs,
    getGigById,
    createGig,
    updateGig,
    deleteGig,
};