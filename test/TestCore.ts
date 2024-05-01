/*
	Test Command Shell을 만들 경우에는 TestMain 모듈을 만들어 각각의 TestComponent 모듈을 Load해서 사용하는 방식으로 한다.
	하지만 지금 상황에서는 각각의 TestComponent 모듈이 TestCore를 포함하여 동작시키는 방식으로 동작시킨다.
*/

const axios = require('axios');
const https = require("https");
import { exec } from "child_process";
const execSync = require('child_process').execSync;
import {LoginInfo} from "./testTypes";

class TestCore{
	private SERVER_HOST = "http://127.0.0.1:42023";
	private _axiosInstance;

	constructor() {
		this._axiosInstance = axios.create({
            httpsAgent: new https.Agent({  
              rejectUnauthorized: false
            }),
            headers:{'Content-Type': 'application/json'},
        });

	}

	_executeAndPrintResult(cmd:string) {
		return new Promise((resolve, reject) => {
			try {
				const result = execSync(cmd);
				const resultJson = JSON.parse(result);
				console.log(JSON.stringify(resultJson, null, "  "));
				
				resolve(resultJson);
			} catch(e : any) {								
				reject(e);
			}
		});
	}

	
	useOperationServer() {
		this.SERVER_HOST = "https://operationurl.com";
	}


	
	async login(email : string, password : string) : Promise<LoginInfo>{
		return await new Promise((resolve, reject)=>{
			const cmd : string = `curl --insecure --request POST ${this.SERVER_HOST}/api/user/login -H "Content-Type: application/json" ` + 
					` -d \'{ "email" : "${email}", "password" : "${password}"}\' `;
			exec(cmd, function(error, stdout, stderr){
				const jsonResult = JSON.parse(stdout);	
				console.log(jsonResult);				
				resolve(jsonResult.bgData.item);
			} );
		});
	}

	async get(url : string, token : string) {
		let cmd = `curl --insecure  --request GET "${this.SERVER_HOST}${url}"  -H "Authorization: ${token}" -H "Content-Type: application/json" `;	
		return await this._executeAndPrintResult(cmd);
	}

	async post(url : string, data : any, token : string) {
		const strJson = JSON.stringify(data);	
		let cmd = `curl --insecure  --request POST "${this.SERVER_HOST}${url}"  -H "Authorization: ${token}" -H "Content-Type: application/json" `
					+ ` -d '${strJson}' `;		
		this._executeAndPrintResult(cmd);
	}

	
	async put(url : string, data : any, token : string) {
		const strJson = JSON.stringify(data);
		let cmd = `curl --insecure  --request PUT "${this.SERVER_HOST}${url}"  -H "Authorization: ${token}" -H "Content-Type: application/json" `
					+ ` -d '${strJson}' `;		
		this._executeAndPrintResult(cmd);
	}

	
	async delete(url : string, token : string) {
		let cmd = `curl --insecure  --request DELETE "${this.SERVER_HOST}${url}"  -H "Authorization: ${token}" -H "Content-Type: application/json" `;
		this._executeAndPrintResult(cmd);
	}


	async multipartForm(method : string, url : string, formData : any, token : string) {		
		try {
			const res = await this._axiosInstance({
				method,
				url: `${this.SERVER_HOST}${url}`,
				data: formData,
				headers: {Authorization: token, "Content-Type": `multipart/form-data; boundary=${formData._boundary}`}
			});			
			console.log(JSON.stringify(res.data, null, 2));
		} catch(e:any){			
			console.log(e.response.data);
		}		
	}
}

export default TestCore;


