const { logger } = require('../database/log-db');
const matchOperations = require('../database/match-db');

const matchHandler = {
    async createMatch(req, res) {
        try {
            const { team1Id, team2Id, team1Score, team2Score, status, time, user } = req.body;
            if (!team1Id || !team2Id || !time) {
                return res.status(400).send({
                    err: 'Missing required fields',
                    body: req.body
                }
                );
            }
            const matchRef = await matchOperations.create(
                team1Id,
                team2Id,
                team1Score || 0,
                team2Score || 0,
                status || 'upcoming',
                time,
            );
            res.status(201).json({ message: 'Match created successfully' });
            await logger('createMatch', new Date().getTime(), user, `New match created: "${matchRef.team1}" VS "${matchRef.team2}"`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to create match' });
        }
    },
    async getAllMatches(req, res) {
        try {
            const matches = await matchOperations.getAll();
            res.status(200).json(matches);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to fetch matches' });
        }
    },

    async updateMatchScoreById(req, res) {
        try {
            const { matchId } = req.params;
            const { team1Score, team2Score } = req.body;
            if (!team1Score && !team2Score) {
                return res.status(400).send({ error: 'Missing required fields' });
            }
            const matchRef = await matchOperations.updateScore(matchId, team1Score, team2Score);
            res.status(200).json({ message: `Match updated: "${matchRef.info}" "${team1Score}-${team2Score}"` });
            await logger('updateMatch', new Date().getTime(), user, `Match`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to update match' });
        }
    },
    // for updating score by team id: increase one 
    async updateMatchScoreByTeamId(req, res) {
        try {
            const { matchId, teamId } = req.params;
            const { user } = req.body;
            const matchRef = await matchOperations.updateScoreByTeamId(matchId, teamId);
            res.status(200).json({ message: `Match score updated` });
            await logger('updateMatchScoreByTeamId', new Date().getTime(), user, `Recorded score increase for team "${matchRef.team1}" in match "${matchRef.info}"`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to update match score' });
        }
    },

    async deleteMatchById(req, res) {
        try {
            const { matchId } = req.params;
            const matchRef = await matchOperations.delete(matchId);
            res.status(200).json({ message: 'Match deleted successfully' });
            await logger('deleteMatch', new Date().getTime(), user, `Match deleted: ${matchRef.info}`);
        } catch (err) {
            console.error("error", err);
            res.status(500).send({ error: 'Failed to delete match' });
        }
    },
    async startMatchById(req, res) {
        try {
            const { matchId } = req.params;
            const { user } = req.body;
            const matchesRef = await matchOperations.startMatch(matchId);
            res.status(200).json({ message: 'Match started successfully' });
            await logger('startMatch', new Date().getTime(), user, `Match started: ${matchesRef.info}`);
        } catch (err) {
            console.error("error", err);
            if (err.message === 'Match not found') {
                return res.status(404).send({ error: err.message });
            }
            if (err.message === 'To start match it must be in upcoming status or break') {
                return res.status(400).send({ error: err.message });
            }
            res.status(500).send({ error: 'Failed to start match' });
        }
    },
    async setBreakById(req, res) {
        try {
            const { matchId } = req.params;
            const { user } = req.body;
            const matchesRef = await matchOperations.setBreak(matchId);
            res.status(200).json({ message: 'Match break set successfully' });
            await logger('setBreak', new Date().getTime(), user, `Match set on break: ${matchesRef.info}`);
        } catch (err) {
            console.error("error", err);
            if (err.message === 'Match not found') {
                return res.status(404).send({ error: err.message });
            }
            if (err.message === 'To set break match must be in ongoing status') {
                return res.status(400).send({ error: err.message });
            }
            res.status(500).send({ error: 'Failed to set break' });
        }
    },
    async endMatchById(req, res) {
        try {
            const { matchId } = req.params;
            const { team1Score, team2Score, user } = req.body;
            if (team1Score === undefined || team2Score === undefined) {
                return res.status(400).send({ error: 'Missing required fields' });
            }
            const matchesRef = await matchOperations.endMatch(matchId, team1Score, team2Score);
            res.status(200).json({ message: 'Match ended successfully' });
            await logger('endMatch', new Date().getTime(), user, `Match ended: "${matchesRef.info}" Score: "${team1Score}-${team2Score}"`);
        } catch (err) {
            console.error('err:', err);
            if (err.message === 'Match not found') {
                return res.status(404).send({ error: err.message });
            }
            if (err.message === 'To end match it must be in ongoing status') {
                return res.status(400).send({ error: err.message });
            }
            if (err.message === 'One or both teams not found') {
                return res.status(404).send({
                    error: `Match ended, but the score was not added. ${err.message}. This will affect the leaderboard and may cause incorrect standings. Please contact the developer with the match details to resolve the issue ASAP.`
                });
            }

            res.status(500).send({ error: 'Failed to end match' });
        }
    }
};

module.exports = matchHandler; 