const modelUsers = require('../Models/users');

const getOneByEmail = async (email) => {
  const getget = await modelUsers.getOneByEmail(email);
  return getget;
};

const createUserService = async (data) => {
  const userData = {
    ...data,
    role: 'user',
  };
  
  const createUser = await modelUsers.createUserModel(userData);
  const { _id: id } = createUser.ops[0];
  return {
    name: createUser.ops[0].name,
    email: createUser.ops[0].email,
    role: createUser.ops[0].role,
    id,
  };
};

const createAdmin = async (data) => {
  const adminData = {
    ...data,
    role: 'admin',
  };
  
  const createUser = await modelUsers.createAdmin(adminData);
  const { _id } = createUser.ops[0];
  return {
    name: createUser.ops[0].name,
    email: createUser.ops[0].email,
    role: createUser.ops[0].role,
    _id,
  };
};

module.exports = {
  createUserService,
  getOneByEmail,
  createAdmin,
};
