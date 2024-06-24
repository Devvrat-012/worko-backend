import User from '../models/user.model.js';

const getUsers = async () => {
    return await User.find({ isDeleted: false });
};

const getUserById = async (userId) => {
    return await User.findOne({ _id: userId, isDeleted: false });
};

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const updateUser = async (userId, userData) => {
    return await User.findOneAndUpdate({ _id: userId, isDeleted: false }, userData, { new: true });
};

const deleteUser = async (userId) => {
    return await User.findOneAndUpdate({ _id: userId, isDeleted: false }, { isDeleted: true }, { new: true });
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
