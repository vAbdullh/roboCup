const { retrieveLogs } = require('../database/log-db');

const getLogs = async (req, res) => {
    try {
        const logs = await retrieveLogs();
        res.status(200).json(logs);
    } catch (err) {
        console.error("error", err);
        res.status(500).send({ error: 'Failed to fetch logs' });
    }
}

module.exports = { getLogs };