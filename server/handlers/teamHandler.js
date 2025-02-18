const { logger } = require('../database/log-db');
const teamOperations = require('../database/team-db');

const teamHandler = {
    async createTeam(req, res) {
        try {
            const { name, logo = null, group = null, user } = req.body;
            if (!name) {
                return res.status(400).send({ error: 'Missing required fields' });
            }
            if (await teamOperations.getByName(name.toLowerCase())) {
                return res.status(400).send({ error: 'Team name already taken' });
            }
            const teamRef = await teamOperations.create(
                name.toLowerCase(),
                logo,
                group,
                points = 0,
                wins = 0,
                losses = 0,
                draws = 0
            );
            res.status(201).json({ message: 'Team created successfully' });
            await logger('createTeam', new Date().getTime(), user, `New team created: ${name}`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to create team' });
        }
    },
    async getAllTeams(req, res) {
        try {
            const teams = await teamOperations.getAll();
            res.status(200).json(teams);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to fetch teams' });
        }
    },
    async getTeamInGroups(req, res) {
        try {
            const teams = await teamOperations.getTeamsInGroups();
            res.status(200).json(teams);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to fetch teams' });
        }
    },
    async updateTeamPointsById(req, res) {
        try {
            const { teamId } = req.params;
            const { points, user } = req.body;
            if (points == null) return res.status(400).json({ error: 'Points are required' });
            const teamDoc = await teamOperations.updatePoints(teamId, points);
            res.status(200).json({ message: 'Team updated successfully' });
            await logger('updateTeam', new Date().getTime(), user, `Points updated for: ${teamDoc.name} from ${teamDoc.points} to ${points}`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to update team' });
        }
    },
    async updateTeamGroupById(req, res) {
        try {
            const { teamId } = req.params;
            const { group, user } = req.body;
            if (group == null) return res.status(400).json({ error: 'group is required' });
            const teamDoc = await teamOperations.updateGroup(teamId, group);
            res.status(200).json({ message: 'Team group updated successfully' });
            await logger('updateTeam', new Date().getTime(), user, `${teamDoc.name} set to group: ${group}`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to update team group' });
        }
    },
    async updateTeamStatsById(req, res) {
        try {
            const { teamId } = req.params;
            const { wins, losses, draws, user } = req.body;

            if (wins == null && losses == null && draws == null) {
                return res.status(400).json({ error: 'Provide at least one stat to update' });
            }

            const updatedStats = {};
            if (wins != null) updatedStats.wins = wins;
            if (losses != null) updatedStats.losses = losses;
            if (draws != null) updatedStats.draws = draws;

            const teamDoc = await teamOperations.updateStats(teamId, updatedStats);
            res.status(200).json({ message: 'Team stats updated successfully' });
            await logger('updateTeamStats', new Date().getTime(), user, `Updated stats for ${teamDoc.name}: ${JSON.stringify(updatedStats)}`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to update team stats' });
        }
    },

    async deleteTeamById(req, res) {
        try {
            const { teamId } = req.params;
            const { user } = req.body;
            const teamDoc = await teamOperations.delete(teamId);
            res.status(200).json({ message: 'Team deleted successfully' });
            await logger('deleteTeam', new Date().getTime(), user, `Team deleted: ${teamDoc.name}`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to delete team' });
        }
    }
}
module.exports = teamHandler;