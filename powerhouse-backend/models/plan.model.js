const { features } = require("process");

module.exports= (sequelize, DataTypes) => {
    const Plan = sequelize.define('Plan', {
        type: { type: DataTypes.STRING, allowNull: false},
        price: { type: DataTypes.STRING, allowNull: false },
        period: { type: DataTypes.STRING, allowNull: false },
        features: { type: DataTypes.JSON, allowNull: false },
        popular: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        timestamps: true
    });

    return Plan;
};