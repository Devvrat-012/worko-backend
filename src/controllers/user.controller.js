import * as userService from '../services/user.service.js';
import { userSchema, userIdSchema } from '../validators/user.validator.js';

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { error } = userIdSchema.validate(req.params);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const user = await userService.getUserById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { error } = userIdSchema.validate(req.params);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const updatedUser = await userService.updateUser(req.params.userId, req.body);
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { error } = userIdSchema.validate(req.params);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const deletedUser = await userService.deleteUser(req.params.userId);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
