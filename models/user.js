module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  user.associate = function(modals) {
    user.hasMany(modals.newCar, {
      onDelete: "cascade"
    });
  };

  return user;
};
