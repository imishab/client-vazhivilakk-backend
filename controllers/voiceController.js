const Voice = require('../models/Voice');
const Receipt = require('../models/Receipt');
const multer = require('multer');
const path = require('path');
const nc = require('next-connect');


// Voice Add Product
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/voices/'); // Directory to save audio files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with original extension
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /\.mp3$/;  // Corrected regex
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = file.mimetype === 'audio/mpeg';  // Ensuring correct MIME type

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only MP3 audio files are allowed!'));
        }
    },
});

// Add voice API with MP3 file uploader
const addVoice = async (req, res) => {
    const { author, category, voicename, note } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No audio file uploaded!' });
        }

        if (await Voice.findOne({ voicename })) {
            return res.status(400).json({ message: 'This voice name already exists' });
        }

        const voice = await Voice.create({
            author,
            voicename,
            note,
            category,
            audio: `/uploads/voices/${req.file.filename}`,
        });

        res.status(201).json({
            id: voice._id,
            author: voice.author,
            voicename: voice.voicename,
            category: voice.category,
            note: voice.note,
            audio: voice.audio,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllVoices = async (req, res) => {
    try {
        const voices = await Voice.find()
            .populate("category", "title") // Populate category field, fetching only the title
            .exec();

        res.status(200).json(voices); // Return the enriched voices data
    } catch (err) {
        console.error("Error fetching voices:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getAllVoicesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query; // Get categoryId from query params
        let query = {};

        if (categoryId) {
            query.category = categoryId; // If categoryId is provided, filter by category
        }

        const voices = await Voice.find(query)
            .populate("category", "title") // Populate category field, fetching only the title
            .exec();

        res.status(200).json(voices); // Return the enriched voices data
    } catch (err) {
        console.error("Error fetching voices:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



const deleteVoice = async (req, res) => {
    const { id } = req.params; // Get voice ID from the route parameters
    try {
        const voice = await Voice.findByIdAndDelete(id); // Find and delete the voice
        if (!voice) {
            return res.status(404).json({ message: 'Voice not found' });
        }
        res.status(200).json({ message: 'Voice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};






module.exports = {

    addVoice,
    upload,
    getAllVoices,
    deleteVoice,
    getAllVoicesByCategory

};
