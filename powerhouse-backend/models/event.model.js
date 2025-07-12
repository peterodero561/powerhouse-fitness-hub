const { Description } = require("@radix-ui/react-dialog");

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        title: { type: DataTypes.STRING, allowNull: false},
        date: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('upcoming', 'previous'), allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
    }, {
        timestamps: true,
        paranoid: true
    });

    return Event;
};