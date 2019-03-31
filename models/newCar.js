module.exports = function(sequelize, DataTypes) {

var newCar = sequelize.define("newCar", {
    plate:{type: varchar(32), allowNull: false},
    state: DataTypes.STRING,
    password: {type: varchar(32), allowNull: false},
  })

  return newCar;
};
