const { db } = require('./index.js');

const logger = async (action, timestamp, user, details) => {
    try {
        const logEntry = {
            action,
            timestamp,
            user,
            details,
        };

        await db.collection('logs').add(logEntry);
    } catch (error) {
        console.error('Error saving log to Firestore:', error);
    }
};

const retrieveLogs = async () => {
    try {
        const logsSnapshot = await db.collection('logs').get();
        if (logsSnapshot.empty) {
            return [];
        }
        const logs = logsSnapshot.docs.map(doc => doc.data());
        return logs;
    } catch (error) {
        console.error('Error retrieving logs from Firestore:', error);
        throw error;
    }
};

module.exports = { logger, retrieveLogs };
