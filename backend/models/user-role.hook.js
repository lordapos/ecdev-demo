const UserRole = require('./UserRole')

exports.hooks = {
  afterCreate: (User, payload) => {
    AddUserRole(User, payload)
  },
}

function AddUserRole (User) {
  let InsertArr = {
    userId: User.dataValues.id,
    roleId: 1,
  }
  UserRole.create(InsertArr)
}