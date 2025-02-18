const teamOperations = require('../database/team-db');

const leaderboardHandler = {
    async getLeaderboard(req, res) {
        try {
            const teams = await teamOperations.getAll();
            const leaderboard = teams
                .map(team => ({
                    name: team.name,
                    points: team.points,
                }))
                .sort((a, b) => b.points - a.points);
            res.status(200).json(leaderboard);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to fetch leaderboard' });
        }
    },
}

module.exports = leaderboardHandler;