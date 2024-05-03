import { Document, model, Schema } from "mongoose";

export interface iProps {
  title: string;
  progress: boolean;
  done: boolean;
}

interface iData {
  todo: iProps[];
  progress: iProps[];
  done: iProps[];
}

interface iPropsData extends iProps, Document {}

const todoModel = new Schema<iPropsData>(
  {
    title: {
      type: String,
    },
    progress: {
      default: false,
      type: Boolean,
    },
    done: {
      default: false,
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);

export default model<iPropsData>("todos", todoModel);
