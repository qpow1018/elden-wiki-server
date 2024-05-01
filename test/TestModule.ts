/*
	Test Command Shell을 만들 경우에는 TestMain 모듈을 만들어 각각의 TestComponent 모듈을 Load해서 사용하는 방식으로 한다.
	하지만 지금 상황에서는 각각의 TestComponent 모듈이 TestCore를 포함하여 동작시키는 방식으로 동작시킨다.
*/
import TestCore from "./TestCore";
import {LoginInfo} from "./testTypes";

type TestFunction = (params : any)=>void;
type RegisterTestFunction = (name : string, fn : TestFunction)=>void;

export default abstract class TestModule{    
    protected _tc : TestCore = new TestCore();
    private _testFunctions : Map<string, TestFunction> = new Map();    
    

    protected abstract TestCase() : void;
    protected abstract testAll() : void;
    
    constructor() {
        this.TestCase();        
    }

    protected async loginWith(name : string) : Promise<LoginInfo>{
        let email : string = "";                
        

        switch(name) {
            case "bg" :     email = "bg@spacehubsociety.com";       break;
            default :
                email = "bg@spacehubsociety.com";                
                break;
        }
        
        return await this._tc.login(email, "spacehub", badgeId, "1234");
    }

    protected register(name : string, fnCallback : TestFunction) {
        this._testFunctions.set(name, fnCallback);
    }
            
    public async test(name : string, params? : any) {
        const fn : TestFunction | undefined = this._testFunctions.get(name);
        if( fn ) 
            return await fn(params);
    }

    public list() {
        this._testFunctions.forEach((_ : TestFunction, key : string)=>{
            console.log(" * " + key);
        });
    }    
}


