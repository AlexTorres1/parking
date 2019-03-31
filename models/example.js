module.exports = function(sequelize, DataTypes) {
  var parkingNew = sequelize.define("parkingNew", {
    plate: {type: varchar(32), allowNull: false},
    state: DataTypes.STRING,
    location: {type: varchar(32), allowNull: false},
    // eslint-disable-next-line prettier/prettier
    amount: DataTypes.DECIMAL(10,2),
    // eslint-disable-next-line prettier/prettier
    date: DataTypes.DATE,
  });
  return parkingNew;
};
