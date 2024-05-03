"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodosCombine = exports.getAllTodos = exports.moveTodoToDone = exports.moveTodoToProgress = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const createTask = yield todoModel_1.default.create({ title });
        return res.status(201).json({
            message: "Todo task created successfully",
            data: createTask,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating todo task",
        });
    }
});
exports.createTodo = createTodo;
const moveTodoToProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID } = req.params;
        const updateTask = yield todoModel_1.default.findByIdAndUpdate(ID, { progress: true }, { new: true });
        return res.status(201).json({
            message: "Todo task Updated successfully",
            data: updateTask,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating todo task",
        });
    }
});
exports.moveTodoToProgress = moveTodoToProgress;
const moveTodoToDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID } = req.params;
        const findTask = yield todoModel_1.default.findById(ID);
        if (findTask === null || findTask === void 0 ? void 0 : findTask.progress) {
            const createTask = yield todoModel_1.default.findByIdAndUpdate(ID, { done: true }, { new: true });
            return res.status(201).json({
                message: "Todo task Updated successfully",
                data: createTask,
            });
        }
        else {
            return res.status(404).json({
                message: "Error creating todo task",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Error creating todo task",
        });
    }
});
exports.moveTodoToDone = moveTodoToDone;
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTasks = yield todoModel_1.default.find();
        return res.status(201).json({
            message: "Todo task Updated successfully",
            data: getTasks,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating todo task",
        });
    }
});
exports.getAllTodos = getAllTodos;
const getAllTodosCombine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTasks = yield todoModel_1.default.find();
        const getAllTasks = getTasks.filter((el) => {
            return el.progress === false && el.done === false;
        });
        const getAllProgress = getTasks.filter((el) => {
            return el.progress === true && el.done === false;
        });
        const getAllDone = getTasks.filter((el) => {
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
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating todo task",
        });
    }
});
exports.getAllTodosCombine = getAllTodosCombine;
