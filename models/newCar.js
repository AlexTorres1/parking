module.exports = function(sequelize, DataTypes) {
  var newCar = sequelize.define("newCar", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    plate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: DataTypes.STRING
  });

  newCar.associate = function(models) {
    newCar.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return newCar;
};
