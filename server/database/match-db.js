const { db, FieldValue } = require('./index.js');
const lastModifyOperations = require('./lastModify-db.js');

// ! Added helper function to centralize score validation
function validateScores(score1, score2) {
    if (isNaN(score1) || isNaN(score2)) {
        throw new Error('Scores must be numbers');
    }
    if (score1 < 0 || score2 < 0) {
        throw new Error('Scores cannot be negative');
    }
}

const matchOperations = {
    async create(team1Id, team2Id, team1Score = 0, team2Score = 0, status = 'upcoming', time) {
        // ! Validate scores using helper function
        validateScores(team1Score, team2Score);

        try {
            // ! Retrieve both team documents and check for existence before proceeding
            const team1Doc = await db.collection('teams').doc(team1Id).get();
            const team2Doc = await db.collection('teams').doc(team2Id).get();
            if (!team1Doc.exists || !team2Doc.exists) {
                throw new Error('Team not found');
            }
            // ! Extract team data for later use
            const team1Data = team1Doc.data();
            const team2Data = team2Doc.data();

            const matchData = {
                info: `${team1Data.name} VS ${team2Data.name}`,
                team1: team1Data.name,
                team2: team2Data.name,
                team1Id,
                team2Id,
                team1Score,
                team2Score,
                status,
                time,
            };

            const matchRef = await db.collection('matches').add(matchData);
            await lastModifyOperations.updateLastModifyMatch();
            // ! Return the new match id along with team names
            return { id: matchRef.id, team1: team1Data.name, team2: team2Data.name };
        } catch (error) {
            console.error('Error creating match:', error); // ! Improved error logging
            throw error;
        }
    },

    // Get all matches
    async getAll() {
        try {
            const matchesRef = db.collection('matches');
            const snapshot = await matchesRef.get();
            const matches = [];
            snapshot.forEach((doc) => {
                matches.push({ id: doc.id, ...doc.data() });
            });
            return matches;
        } catch (error) {
            console.error('Error fetching all matches:', error); // ! Improved error logging
            throw error;
        }
    },

    async getById(matchId) {
        try {
            const matchDoc = await db.collection('matches').doc(matchId).get();
            if (!matchDoc.exists) {
                throw new Error('Match not found');
            }
            return { id: matchDoc.id, ...matchDoc.data() };
        } catch (error) {
            console.error('Error fetching match by ID:', error); // ! Improved error logging
            throw error;
        }
    },

    async updateScore(matchId, team1Score, team2Score) {
        // ! Validate scores using helper function
        validateScores(team1Score, team2Score);
        try {
            const matchRef = db.collection('matches').doc(matchId);
            await matchRef.update({
                team1Score,
                team2Score,
            });
            await lastModifyOperations.updateLastModifyMatch();
            // ! Fetch updated match data to return a meaningful response
            const updatedMatch = await matchRef.get();
            return { id: updatedMatch.id, ...updatedMatch.data() };
        } catch (error) {
            console.error('Error updating match score:', error); // ! Improved error logging
            throw error;
        }
    },
    async updateScoreByTeamId(matchId, teamId) {
        try {
            const matchRef = db.collection('matches').doc(matchId);
            const matchDoc = await matchRef.get();

            if (!matchDoc.exists) {
                throw new Error('Match document does not exist');
            }

            const matchData = matchDoc.data();
            const isTeam1 = teamId === matchData.team1Id;
            const isTeam2 = teamId === matchData.team2Id;

            if (!isTeam1 && !isTeam2) {
                throw new Error('Team ID does not match any team in the match');
            }

            await matchRef.update({
                team1Score: FieldValue.increment(isTeam1 ? 1 : 0), // Use FieldValue.increment
                team2Score: FieldValue.increment(isTeam2 ? 1 : 0),
            });

            await lastModifyOperations.updateLastModifyMatch();

            const updatedMatch = await matchRef.get();
            return { id: updatedMatch.id, ...updatedMatch.data() };
        } catch (error) {
            console.error('Error updating match score:', error);
            throw error;
        }
    },
    async delete(matchId) {
        try {
            await db.collection('matches').doc(matchId).delete();
            await lastModifyOperations.updateLastModifyMatch();
        } catch (error) {
            console.error('Error deleting match:', error); // ! Improved error logging
            throw error;
        }
    },

    async startMatch(matchId) {
        try {
            const matchRef = db.collection('matches').doc(matchId);
            if (!(await matchRef.get()).exists) {
                throw new Error('Match not found');
            }
            const matchData = (await matchRef.get()).data();
            if (matchData.status !== 'upcoming' && matchData.status !== 'break') {
                throw new Error('To start match it must be in upcoming status or break');
            }
            await matchRef.update({ status: 'ongoing' });
            await lastModifyOperations.updateLastModifyMatch();
            // ! Fetch updated match data for a consistent response
            const updatedMatch = await matchRef.get();
            return { id: updatedMatch.id, ...updatedMatch.data() };
        } catch (error) {
            console.error('Error starting match:', error); // ! Improved error logging
            throw error;
        }
    },

    async endMatch(matchId, team1Score, team2Score) {
        // ! Validate scores using helper function
        validateScores(team1Score, team2Score);
        try {
            const matchRef = db.collection('matches').doc(matchId);
            // ! Retrieve the match document to verify its current status
            const matchDoc = await matchRef.get();
            if (!matchDoc.exists) {
                throw new Error('Match not found');
            }
            const matchData = matchDoc.data();
            if (matchData.status !== 'ongoing') {
                throw new Error('To end match it must be in ongoing status');
            }

            // ! Update match status and scores
            await matchRef.update({ status: 'completed', team1Score, team2Score });
            // ! Refresh match data after update
            const updatedMatchDoc = await matchRef.get();
            const { team1Id, team2Id } = updatedMatchDoc.data();

            // ! Initialize variables for stats update
            let team1Points = 0;
            let team2Points = 0;
            let team1Wins = 0;
            let team2Wins = 0;
            let team1Losses = 0;
            let team2Losses = 0;
            let team1Draws = 0;
            let team2Draws = 0;

            if (team1Score > team2Score) {
                team1Points = 3;
                team1Wins = 1;
                team2Losses = 1;
            } else if (team1Score < team2Score) {
                team2Points = 3;
                team2Wins = 1;
                team1Losses = 1;
            } else {
                team1Points = 1;
                team2Points = 1;
                team1Draws = 1;
                team2Draws = 1;
            }

            const team1Ref = db.collection('teams').doc(team1Id);
            const team2Ref = db.collection('teams').doc(team2Id);

            await db.runTransaction(async (transaction) => {
                const team1Doc = await transaction.get(team1Ref);
                const team2Doc = await transaction.get(team2Ref);

                // ! Verify that both team documents exist before updating
                if (!team1Doc.exists || !team2Doc.exists) {
                    throw new Error('One or both teams not found');
                }

                const team1Data = team1Doc.data();
                const team2Data = team2Doc.data();

                transaction.update(team1Ref, {
                    points: team1Data.points + team1Points,
                    wins: team1Data.wins + team1Wins,
                    losses: team1Data.losses + team1Losses,
                    draws: team1Data.draws + team1Draws,
                });

                transaction.update(team2Ref, {
                    points: team2Data.points + team2Points,
                    wins: team2Data.wins + team2Wins,
                    losses: team2Data.losses + team2Losses,
                    draws: team2Data.draws + team2Draws,
                });
            });

            await lastModifyOperations.updateLastModifyMatch();
            // ! Return the final updated match details
            const finalMatchDoc = await matchRef.get();
            return { id: finalMatchDoc.id, ...finalMatchDoc.data() };
        } catch (error) {
            console.error('Error ending match:', error); // ! Improved error logging
            throw error;
        }
    },

    async setBreak(matchId) {
        try {
            const matchRef = db.collection('matches').doc(matchId);
            if (!(await matchRef.get()).exists) {
                throw new Error('Match not found');
            }
            if ((await matchRef.get()).data().status !== 'ongoing') {
                throw new Error('To set break match must be in ongoing status');
            }
            await matchRef.update({ status: 'break' });
            await lastModifyOperations.updateLastModifyMatch();
            // ! Fetch updated match data for a consistent response
            const updatedMatch = await matchRef.get();
            return { id: updatedMatch.id, ...updatedMatch.data() };
        } catch (error) {
            console.error('Error setting break:', error); // ! Improved error logging
            throw error;
        }
    }
};

module.exports = matchOperations;
