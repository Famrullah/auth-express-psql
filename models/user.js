import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      }
    }
  );
  // User.beforeCreate((user, options) => {
  //   return bcrypt
  //     .hash(user.password, 10)
  //     .then(hash => {
  //       user.password = hash;
  //     })
  //     .catch(err => {
  //       throw new Error();
  //     });
  // });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
