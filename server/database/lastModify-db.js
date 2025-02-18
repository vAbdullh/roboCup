const { db } = require('./index.js');

const lastModifyOperations = {
    async getLastModifyTeam() {
        try {
            const lastModifyRef = await db.collection('lastModify').doc('team').get();
            return lastModifyRef.data().lastModify;
        } catch (error) {
            console.error('Error getting last modify team:', error.message);
            throw error;
        }
    },
    async updateLastModifyTeam() {
        try {
            await db.collection('lastModify').doc('team').set({ lastModify: new Date().getTime() });
        } catch (error) {
            console.error('Error updating last modify team:', error.message);
            throw error;
        }
    },
    async updateLastModifyMatch() {
        try {
            await db.collection('lastModify').doc('match').set({ lastModify: new Date().getTime() });
        } catch (error) {
            console.error('Error updating last modify match:', error.message);
            throw error;
        }
    }
}
module.exports = lastModifyOperations;