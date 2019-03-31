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
  state: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: "user",
    referencesKey: "id"
  }
});

  return newCar;
};
