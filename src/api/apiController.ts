/**************************************************************************************************
    File Name   : apiController.ts

    Description :
        BG Programming test user postgresql query module

    Update History :
        2022.06     BGKim       Create
**************************************************************************************************/

import {RouterParameters}     from "@appTypes";
import {Express} from 'express';
import { api } from "@libs/api";
import userControllerRouter from "./userController";


export default function  (app : Express) {
	api.init(app);	
	const params: RouterParameters = {app, api};	

	userControllerRouter(params);	
}
