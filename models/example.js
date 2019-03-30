module.exports = function(sequelize, DataTypes) {
  var parkingNew = sequelize.define("parkingNew", {
    plate: DataTypes.STRING,
    state: DataTypes.STRING,
    location: DataTypes.STRING,
    // eslint-disable-next-line prettier/prettier
    amount: DataTypes.DECIMAL(10,2),
    // eslint-disable-next-line prettier/prettier
    date: DataTypes.DATE,
  });
  return parkingNew;
};
