import { Express } from 'express';
import { RouterParameters } from "@appTypes";
import { api } from "@libs/api";

import userControllerRouter from "./userController";
import itemController from "./itemController";

export default function (app: Express) {
  api.init(app);
  const params: RouterParameters = { app, api };

  userControllerRouter(params);
  itemController(params);
}