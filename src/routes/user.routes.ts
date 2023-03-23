import express, { Request, Response } from 'express';
import controller from '../controllers/user.controller';
import { upload } from '../utils/diskStorage';

const router = express.Router();
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUser);
router.get('/users/search/:name', controller.searchUser);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);
router.post('/users', controller.addUser);
router.put('/users/:id/photo', upload.single('file'), controller.uploadPhoto);

export = router;