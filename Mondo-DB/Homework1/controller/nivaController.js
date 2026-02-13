const niva = require('../models/niva');

exports.dodajNiva = async (req, res) => {
    try {
        const novaNiva = await niva.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                niva: novaNiva
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.prikaziNivi = async (req, res) => {
    try {
        const nivi = await niva.find();
        res.status(200).json({
            status: 'success',
            data: {
                nivi
            },
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}