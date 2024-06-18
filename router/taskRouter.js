import express from 'express';

import {isAuthenticated} from "../middlewares/auth.js"
import { createTaskSchema, deleteTask, getMyTasks, updateTask } from '../controller/taskController.js';

const router =express.Router();

router.post("/add",isAuthenticated,createTaskSchema);

router.get("/my",isAuthenticated,getMyTasks);

router.delete("/delete/:id",isAuthenticated,deleteTask);

router.put("/update/:id",isAuthenticated,updateTask);

export default router;