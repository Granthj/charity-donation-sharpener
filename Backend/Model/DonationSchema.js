const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Donation = db.define('Donation',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    cashFreeRefId:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
}   ,
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    charityId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    // paymentId:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // },
    amount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    paymentStatus:{
        type:DataTypes.ENUM('pending','success','failed'),
        allowNull:false,
        defaultValue:'Pending'
    }
},{
    timestamps:true
}
);

module.exports = Donation;