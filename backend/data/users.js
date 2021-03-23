const bcrypt = require('bcryptjs');

const users =
  {
    name: 'ecdev',
    email: 'lordapos@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  };

module.exports = users;