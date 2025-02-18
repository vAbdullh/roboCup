const { db } = require('./index.js');
const lastModifyOperations = require('./lastModify-db.js');

const teamOperations = {
    async create(name, logo, group, points, wins, losses, draws) {
        try {
            const teamRef = await db.collection('teams').add({
                name,
                logo,
                group,
                points,
                wins,
                losses,
                draws
            });
            await lastModifyOperations.updateLastModifyTeam();
            return { id: teamRef.id };
        } catch (error) {
            console.error('Error creating team:', error.message);
            throw error;
        }
    },
    async getAll() {
        try {
            const snapshot = await db.collection('teams').get();
            const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return teams;
        } catch (error) {
            console.error('Error getting teams:', error.message);
            throw error;
        }
    },
    async getTeamsInGroups() {
        try {
            const snapshot = await db.collection('teams').get();
            const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const groups = { unassigned: [] };
            teams.forEach(team => {
                if (team.group === undefined || team.group === null) {
                    groups.unassigned.push(team);
                } else {
                    if (!groups[team.group]) {
                        groups[team.group] = [];
                    }
                    groups[team.group].push(team);
                }
            });
            const fullList = { ...groups, allTeams: teams };
            return groups;
        } catch (error) {
            console.error('Error getting teams:', error.message);
            throw error;
        }
    },

    async getById(id) {
        try {
            const teamDoc = await db.collection('teams').doc(id).get();
            if (!teamDoc.exists) {
                throw new Error('Team not found');
            }
            return { id: teamDoc.id, ...teamDoc.data() };
        } catch (error) {
            console.error('Error getting team by id:', error.message);
            throw error;
        }
    },
    async getByName(name) {
        try {
            const snapshot = await db.collection('teams').where('name', '==', name).get();
            if (snapshot.empty) {
                return null;
            }
            const team = snapshot.docs[0].data();
            return { id: snapshot.docs[0].id, ...team };
        } catch (error) {
            console.error('Error getting team by name:', error.message);
            throw error;
        }
    },

    async updatePoints(teamId, points) {
        try {
            const teamRef = await db.collection('teams').doc(teamId);
            const teamDoc = (await teamRef.get()).data();
            await teamRef.update({ points });
            await lastModifyOperations.updateLastModifyTeam();
            return teamDoc;
        } catch (error) {
            console.error('Error updating team:', error.message);
            throw error;
        }
    },
    async updateGroup(teamId, group) {
        try {
            const teamRef = await db.collection('teams').doc(teamId);
            const teamDoc = (await teamRef.get()).data();
            await teamRef.update({ group });
            await lastModifyOperations.updateLastModifyTeam();
            return teamDoc;
        } catch (error) {
            console.error('Error updating team:', error.message);
            throw error;
        }
    },
    async updateStats(teamId, updatedStats) {
        try {
            const teamRef = await db.collection('teams').doc(teamId);
            const teamDoc = (await teamRef.get()).data();
            await teamRef.update(updatedStats);
            await lastModifyOperations.updateLastModifyTeam();
            return teamDoc;
        } catch (error) {
            console.error('Error updating team:', error.message);
            throw error;
        }
    },

    async delete(teamId) {
        try {
            const teamRef = await db.collection('teams').doc(teamId);
            const teamDoc = (await teamRef.get()).data();
            await teamRef.delete();
            await lastModifyOperations.updateLastModifyTeam();
            return teamDoc;
        } catch (error) {
            console.error('Error deleting team:', error.message);
            throw error;
        }
    }
}

module.exports = teamOperations;