const db = require('../Utils/db');
const { DataTypes } = require('sequelize');


const Payment = db.define('Payments',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    cashFreeRefId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    donarId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    donationOrganisationId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    donationSessionId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    donateAmount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    donateCurrency:{
        type:DataTypes.STRING(10),
        allowNull:false,
        defaultValue:'INR'
    },
    donationStatus:{
        type:DataTypes.ENUM('Pending','Success','Failure'),
        allowNull:false,
        defaultValue:'Pending',
    }
},
{
    tableName:'payments',
    timestamps:true
}
);
module.exports = Payment;