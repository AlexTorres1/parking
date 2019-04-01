module.exports = function(sequelize, DataTypes) {
  var parkingNew = sequelize.define("parkingNew", {
    plate: { type: DataTypes.STRING, allowNull: false},
    state: DataTypes.STRING,
    location: { type: DataTypes.STRING, allowNull: false},
    // eslint-disable-next-line prettier/prettier
    amount: DataTypes.DECIMAL(10,2),
    // eslint-disable-next-line prettier/prettier
    date: DataTypes.DATE,
  });

  parkingNew.associate = function(models) {
    parkingNew.belongsTo(models.newCar)
  }

  return parkingNew;
};
