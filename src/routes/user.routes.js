import express from 'express';
const router = express.Router();
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import authenticate from '../middleware/auth.js';

router.post('/worko/user', createUser);
router.get('/worko/user', authenticate, getUsers);
router.get('/worko/user/:userId', authenticate, getUserById);
router.put('/worko/user/:userId', authenticate, updateUser);
router.patch('/worko/user/:userId', authenticate, updateUser);
router.delete('/worko/user/:userId', authenticate, deleteUser);

export default router;
