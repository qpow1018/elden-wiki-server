import {Express } from "express";
import apiController from "./api/apiController";

export default function main( app : Express ){
	apiController(app);
}

