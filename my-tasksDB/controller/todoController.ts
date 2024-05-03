import { Request, Response } from "express";
import todoModel, { iProps } from "../model/todoModel";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title } = req.body;

    const createTask = await todoModel.create({ title });
    return res.status(201).json({
      message: "Todo task created successfully",
      data: createTask,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating todo task",
    });
  }
};

export const moveTodoToProgress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { ID } = req.params;

    const updateTask = await todoModel.findByIdAndUpdate(
      ID,
      { progress: true },
      { new: true }
    );
    return res.status(201).json({
      message: "Todo task Updated successfully",
      data: updateTask,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating todo task",
    });
  }
};

export const moveTodoToDone = async (req: Request, res: Response) => {
  try {
    const { ID } = req.params;

    const findTask = await todoModel.findById(ID);

    if (findTask?.progress) {
      const createTask = await todoModel.findByIdAndUpdate(
        ID,
        { done: true },
        { new: true }
      );
      return res.status(201).json({
        message: "Todo task Updated successfully",
        data: createTask,
      });
    } else {
      return res.status(404).json({
        message: "Error creating todo task",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      message: "Error creating todo task",
    });
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getTasks = await todoModel.find();
    return res.status(201).json({
      message: "Todo task Updated successfully",
      data: getTasks,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating todo task",
    });
  }
};

export const getAllTodosCombine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getTasks = await todoModel.find();

    const getAllTasks = getTasks.filter((el: iProps) => {
      return el.progress === false && el.done === false;
    });
    const getAllProgress = getTasks.filter((el: iProps) => {
      return el.progress === true && el.done === false;
    });
    const getAllDone = getTasks.filter((el: iProps) => {
      return el.progress === true && el.done === true;
    });

    let data = {
      task: getAllTasks,
      progress: getAllProgress,
      done: getAllDone,
    };
    return res.status(201).json({
      message: "Todo task Updated successfully",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating todo task",
    });
  }
};
