import { Router } from "express";

import {
    getCurrentUser, updateUser,
} from "../controllers/userController.js";
import upload from "../middleware/multerMiddleware.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

const router = Router();


router.get('/current-user', getCurrentUser);
router.patch('/update-user', upload.single("avatar"), validateUpdateUser, updateUser);


export default router;