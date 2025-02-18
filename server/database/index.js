const admin = require("../utils/firebaseAdmin");

// Access Firestore
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
module.exports = { db, FieldValue };