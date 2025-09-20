module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
        title: { type: DataTypes.STRING, allowNull: false},
        description: { type: DataTypes.TEXT, allowNull: false },
        images: { type: DataTypes.JSON, allowNull: false, defaultValue: [] }
    }, {
        timestamps: true, paranoid: true
    });

    return Feature;
};