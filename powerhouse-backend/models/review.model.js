const { timeStamp } = require("console");

module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        name: { type: DataTypes.STRING, allowNull: false },
        rating: { type: DataTypes.INTEGER, allowNull: false, validate: {min: 1, max: 5} },
        image: { type: DataTypes.STRING, allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: false },
        is_top: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        timestamps: true
    });
    
    return Review;
};