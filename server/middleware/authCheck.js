const { db } = require("../database/index");
const admin = require("../utils/firebaseAdmin");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ error: "Forbidden: No token provided" });
    }
    const idToken = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        const userDoc = await db.collection("users").doc(uid).get();

        req.body.user = userDoc.data().fullName;

        next();
    } catch (error) {
        res.status(403).json({ error: "Forbidden: Invalid or expired token" });
    }
}
module.exports = { authMiddleware };
