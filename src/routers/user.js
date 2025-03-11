import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCurrentUserController, patchUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { updateUserSchema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getCurrentUserController));
router.patch('/', validateBody(updateUserSchema), ctrlWrapper(patchUserController));
router.patch('/avatar', upload.single('avatarUrl'), ctrlWrapper(patchUserController));
