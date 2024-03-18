// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      firstname: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      lastname: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
    return User;
  };