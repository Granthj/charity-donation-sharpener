const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Charity = db.define('Charity',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    organizationName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    location:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    goal:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    totalDonation:{
        type:DataTypes.DECIMAL(10,2),
        defaultValue:0,
        allowNull:true
    },
    totalDonations:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0
    },
   category:{
    type:DataTypes.ENUM(
        'education',
        'healthcare',
        'child_welfare',
        'women_empowerment',
        'animal_welfare',
        'environment',
        'poverty_alleviation',
        'food_relief',
        'disaster_relief',
        'elderly_care',
        'disability_support',
        'human_rights',
        'community_development',
        'rural_development',
        'religious',
        'other'
    ),
    allowNull:false
    },
    mission:{
        type:DataTypes.TEXT
    },
    image:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM('pending','approved','rejected'),
        defaultValue:'pending'
    }
});

module.exports = Charity;