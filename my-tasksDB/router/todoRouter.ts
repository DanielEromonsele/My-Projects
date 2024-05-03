import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  getAllTodosCombine,
  moveTodoToDone,
  moveTodoToProgress,
} from "../controller/todoController";

const router: Router = Router();

router.route("/create").post(createTodo);
router.route("/progress/:ID").patch(moveTodoToProgress);
router.route("/done/:ID").patch(moveTodoToDone);
router.route("/get-todos").get(getAllTodosCombine);
router.route("/getprogress").get(getAllTodos);

export default router;
