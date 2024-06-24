import * as userDao from '../daos/user.dao.js';

const getUsers = async () => {
    return await userDao.getUsers();
};

const getUserById = async (userId) => {
    return await userDao.getUserById(userId);
};

const createUser = async (userData) => {
    return await userDao.createUser(userData);
};

const updateUser = async (userId, userData) => {
    return await userDao.updateUser(userId, userData);
};

const deleteUser = async (userId) => {
    return await userDao.deleteUser(userId);
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
