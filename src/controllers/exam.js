const { response } = require('express');
const Exam = require('../models/Exam');

const newScore = async (req, res = response) => {
    const newScore = new Exam(req.body)
    try {
        const scoreSave = await newScore.save()
        res.json({
            ok: true,
            score: scoreSave
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getScores = async (req, res = response) => {
    const scores = await Exam.find()
        .populate('usuario', 'name')

    res.json({
        ok: true,
        scores
    });
}

module.exports = {
    newScore,
    getScores
}