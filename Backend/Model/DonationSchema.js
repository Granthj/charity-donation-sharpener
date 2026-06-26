const db = require('../Utils/db');
const { DataTypes } = require('sequelize');

const Donation = db.define('Donation',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    charityId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    paymentId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    amount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    paymentStatus:{
        type:DataTypes.ENUM('pending','success','failed'),
        allowNull:false
    }
},{
    timestamps:true
}
);

module.exports = Donation;