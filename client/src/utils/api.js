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
            const response = await axios.get(`${API_URL}/team`,);
            return response.data
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
            const response = await axios.get(`${API_URL}/match`);
            return response.data;
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
    deleteMatch: async (matchId, token) => {
        try {
            const response = await axios.patch(`${API_URL}/match/start/${matchId}`, {}, createAuthHeader(token));
            return response.data.message;
        } catch (error) {
            console.error("Error starting match:", error);
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
    getLogs: async (token) => {
        try {
            // throw new Error("Not implemented");
            const response = await axios.get(`${API_URL}/logs`, createAuthHeader(token));
            return response.data;
        } catch (error) {
            console.error("Error getting logs:", error);
            throw new Error(error.response?.data?.error || "An error occurred. Try again or contact the developer.");
        }
    }
};

export default api;
