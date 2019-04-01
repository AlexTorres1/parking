module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
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
