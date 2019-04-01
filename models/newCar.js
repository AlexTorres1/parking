module.exports = function(sequelize, DataTypes) {
  var newCar = sequelize.define("newCar", {
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    state: DataTypes.STRING
  });

  newCar.associate = function(models) {
    newCar.belongsTo(models.user)
    newCar.hasMany(models.parkingNew)
  }

  return newCar;
};
