const sequelize = require("sequelize");
const db = require("../config/database");
var user = db.define(
    "user",
    {
        phone: { type: sequelize.INTEGER, primaryKey: true },
        name: { type: sequelize.STRING },
        job: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        address: { type: sequelize.STRING },
        city: { type: sequelize.STRING },
        state: { type: sequelize.STRING },
        name_contact_1: { type: sequelize.STRING },
        phone_1: { type: sequelize.INTEGER },
        relationship_1: {type: sequelize.STRING},
        name_contact_2: { type: sequelize.STRING },
        phone_2: { type: sequelize.INTEGER },
        relationship_2: {type: sequelize.STRING}
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
db.sync().then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
module.exports = user;