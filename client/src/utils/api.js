import axios from "axios";

// Define the API URL
const API_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

// Function to create headers for authorization
const createAuthHeader = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`, // Use optional chaining in case user is null or undefined
    },
});

// Define the API object to manage requests
const api = {
    getTeams: async () => {
        try {
            return teamsData;
        } catch (error) {
            console.error("Error getting teams:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    setGroup: async (teamId, group, token) => {
        try {
            const response = await axios.patch(`${API_URL}/team/${teamId}/group`, { group }, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error setting group:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    createTeam: async (team, token) => {
        try {
            const response = await axios.post(`${API_URL}/team`, team, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error creating team:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    deleteTeam: async (teamId, token) => {
        try {
            const response = await axios.delete(`${API_URL}/team/${teamId}`, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error deleting team:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    getMatches: async () => {
        try {
            return matchesData;
        } catch (error) {
            console.error("Error getting matches:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    createMatch: async (match, token) => {
        try {
            const response = await axios.post(`${API_URL}/match`, match, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error creating match:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    updateVenue: async (matchId, venue, token) => {
        try {
            const response = await axios.patch(`${API_URL}/match/venue/${matchId}`, { venue }, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error updating venue:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },

    deleteMatch: async (matchId, token) => {
        try {
            const response = await axios.delete(`${API_URL}/match/${matchId}`, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error deleting match:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    startMatch: async (matchId, token) => {
        try {
            const response = await axios.patch(`${API_URL}/match/start/${matchId}`, {}, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error starting match:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    setBreakMatch: async (matchId, token) => {
        try {
            const response = await axios.patch(`${API_URL}/match/break/${matchId}`, {}, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error pausing match:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    endMatch: async (matchId, team1Score, team2Score, token) => {
        try {
            const response = await axios.patch(`${API_URL}/match/end/${matchId}`, { team1Score, team2Score }, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error ending match:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    updateMatchScoreByTeamId: async (matchId, teamId, token) => {
        try {
            const response = await axios.patch(`${API_URL}/match/score/${matchId}/${teamId}`, {}, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error updating match score:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    updateMatchScore: async (matchId, team1Score, team2Score, token) => {
        try {
            const response = await axios.patch(`${API_URL}/match/score/${matchId}`, { team1Score, team2Score }, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error updating match score:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    },
    getLogs: async (token) => {
        try {
            return logsData;
        } catch (error) {
            console.error("Error getting logs:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    }
};

export default api;

const teamsData = [
    { "id": "QPLVKta5dRFub9l1Ls48", "name": "team 1", "logo": null, "group": "A", "draws": 2, "losses": 1, "wins": 2, "points": 9 },
    { "id": "QPLVKta5dRFub9l1Ls48", "name": "team 2", "logo": null, "group": "B", "draws": 1, "losses": 1, "wins": 2, "points": 3 },
    { "id": "QPLVKta5dRFub9l1Ls48", "name": "team 3", "logo": null, "group": "C", "draws": 0, "losses": 1, "wins": 4, "points": 1 },
    { "id": "QPLVKta5dRFub9l1Ls48", "name": "team 4", "logo": null, "group": "A", "draws": 3, "losses": 0, "wins": 2, "points": 12 },
    { "id": "QPLVKta5dRFub9l1Ls48", "name": "team54", "logo": null, "group": "A", "draws": 3, "losses": 0, "wins": 2, "points": 2 },
]

const matchesData = [
    { "id": "9KZWj9ET6tiU2B9es5uR", "info": "team 1 VS team 2", "team1": "team 1", "team2": "team 2", "team1Id": "pUAN26qVgeDyBUfzIcCp", "team2Id": "R282NGyoXCWD54ELnE5i", "time": "2025-05-06T07:00:00.000Z", "venue": "field 1", "team1Score": 1, "team2Score": 3, "status": "completed" },
    { "id": "9KZWj9ET6tiU2B9es5uR", "info": "team 1 VS team 2", "team1": "team 1", "team2": "team 2", "team1Id": "pUAN26qVgeDyBUfzIcCp", "team2Id": "R282NGyoXCWD54ELnE5i", "time": "2025-05-06T07:00:00.000Z", "venue": "field 2", "team1Score": 2, "team2Score": 2, "status": "upcoming" },
    { "id": "9KZWj9ET6tiU2B9es5uR", "info": "team 1 VS team 2", "team1": "team 1", "team2": "team 2", "team1Id": "pUAN26qVgeDyBUfzIcCp", "team2Id": "R282NGyoXCWD54ELnE5i", "time": "2025-05-06T07:00:00.000Z", "venue": "field 4", "team1Score": 3, "team2Score": 1, "status": "break" },
    { "id": "9KZWj9ET6tiU2B9es5uR", "info": "team 1 VS team 2", "team1": "team 1", "team2": "team 2", "team1Id": "pUAN26qVgeDyBUfzIcCp", "team2Id": "R282NGyoXCWD54ELnE5i", "time": "2025-05-06T07:00:00.000Z", "venue": "field 3", "team1Score": 4, "team2Score": 0, "status": "live" },
]

const logsData = [
    {
        "action": "createTeam",
        "timestamp": 1746474945002,
        "user": "Admin",
        "details": "New team created: New "
    },
    {
        "action": "deleteTeam",
        "timestamp": 1746474890880,
        "user": "Master of Ctrl+C, Ctrl+V",
        "details": "Team deleted: team b"
    },
    {
        "action": "createMatch",
        "timestamp": 1740954853182,
        "user": "Master of Ctrl+C, Ctrl+V",
        "details": "New match created: team b VS team 2"
    },
    {
        "action": "deleteMatch",
        "timestamp": 1742672671321,
        "user": "RoboCup Admin",
        "details": "Match deleted: team 2 VS team 4"
    },
    {
        "action": "startMatch",
        "timestamp": 1740954835036,
        "user": "Master of Ctrl+C, Ctrl+V",
        "details": "Match started: team 3 VS team 4"
    },
    {
        "action": "endMatch",
        "timestamp": 1741000451495,
        "user": "Master of Ctrl+C, Ctrl+V",
        "details": "Match ended: team 3 VS team 2 Score: 0-0"
    },
    {
        "action": "updateMatchScoreByTeamId",
        "timestamp": 1744543828441,
        "user": "Admin",
        "details": "Recorded score increase for team team 2 in match team 2 VS team 3"
    },
    {
        "action": "updateMatchVenue",
        "timestamp": 1740955268890,
        "user": "Master of Ctrl+C, Ctrl+V",
        "details": "Match venue updated: team 2 VS team 4"
    },
    {
        "action": "updateTeam",
        "timestamp": 1746658311828,
        "user": "Mohammad Saleh Alzahrani",
        "details": "axion set to group: A"
    },
    {
        "action": "setBreak",
        "timestamp": 1744543841228,
        "user": "Admin",
        "details": "Match set on break: team 1 VS team 2"
    }
];