const { authMiddleware } = require('./middleware/authCheck');
const matchHandler = require('./handlers/matchHandler');
const teamHandler = require('./handlers/teamHandler');
const leaderboardHandler = require('./handlers/leaderboardHandler');
const { getLogs } = require('./handlers/logsHandler');
const healthHandler = require('./handlers/healthHandler').default;

module.exports = function (app) {
    app.get('/health', healthHandler.health);

    app.get('/match', matchHandler.getAllMatches);
    app.post('/match', authMiddleware, matchHandler.createMatch);
    app.patch('/match/start/:matchId', authMiddleware, matchHandler.startMatchById);
    app.patch('/match/break/:matchId', authMiddleware, matchHandler.setBreakById);
    app.patch('/match/end/:matchId', authMiddleware, matchHandler.endMatchById);
    app.patch('/match/score/:matchId/:teamId', authMiddleware, matchHandler.updateMatchScoreByTeamId);
    app.patch('/match/:matchId', authMiddleware, matchHandler.updateMatchScoreById);
    app.delete('/match/:matchId', authMiddleware, matchHandler.deleteMatchById);

    app.get('/team', teamHandler.getAllTeams);
    app.get('/team/group', teamHandler.getTeamInGroups);
    app.post('/team', authMiddleware, teamHandler.createTeam);
    app.patch('/team/:teamId', authMiddleware, teamHandler.updateTeamPointsById);
    app.patch('/team/:teamId/stats', authMiddleware, teamHandler.updateTeamStatsById);
    app.patch('/team/:teamId/group', authMiddleware, teamHandler.updateTeamGroupById);
    app.delete('/team/:teamId', authMiddleware, teamHandler.deleteTeamById);

    app.get('/logs', authMiddleware, getLogs);
    app.get('/leaderboard', authMiddleware, leaderboardHandler.getLeaderboard);
};
