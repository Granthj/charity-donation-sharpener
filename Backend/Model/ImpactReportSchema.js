const db = require('../Utils/db');
const {DataTypes} = require('sequelize');

const ImpactReport = db.define("ImpactReport",{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    charityId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    title:{
        type:DataTypes.STRING,
        allowNull:false
    },

    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    donationId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    // image:{
    //     type:DataTypes.STRING,
    //     allowNull:true
    // },

    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

});


module.exports = ImpactReport;