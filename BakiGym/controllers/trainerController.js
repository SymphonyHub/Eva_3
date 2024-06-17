const Trainer = require('../models/Trainer');

exports.createTrainer = async (req, res) => {
    try {
        const newTrainer = await Trainer.create(req.body);
        res.redirect('/trainers');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
        res.render('trainers/show', { trainer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
        await trainer.update(req.body);
        res.redirect(`/trainers/${trainer.id}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
        await trainer.destroy();
        res.redirect('/trainers');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.findAll();
        res.render('trainers/index', { trainers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.renderNewTrainerForm = (req, res) => {
    res.render('trainers/new');
};

exports.renderEditTrainerForm = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
        res.render('trainers/edit', { trainer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
