const bcrypt = require('bcryptjs')

const matchPassword = async (enteredPassword, password) => {
  return await bcrypt.compare(enteredPassword, password)
}

module.exports = matchPassword