const Log = require('../models/logModel');

const getAllLogs = async (req, res) => {
    try {
        const logs = await Log.findAll();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLogsByTable = async (req, res) => {
    try {
        const logs = await Log.findByTable(req.params.tabela_afetada);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllLogs,
    getLogsByTable
};