"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const cors_1 = __importDefault(require("cors"));
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const mainApp = (app) => {
    try {
        app.use("/api", todoRouter_1.default);
        app.use((0, cors_1.default)());
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Welcome to my api",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "error",
                });
            }
        });
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
