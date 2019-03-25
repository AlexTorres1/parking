module.exports = function(sequelize, DataTypes) {
  var parkingNew = sequelize.define("parkingNew", {
    plate: DataTypes.STRING,
    state: DataTypes.STRING,
    location: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10,2),
    date: DataTypes.DATE,
  });
  return parkingNew;
};
