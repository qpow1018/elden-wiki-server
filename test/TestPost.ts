import TestModule from "./TestModule";
import {LoginInfo} from "./testTypes";
import fs from "fs";
const FormData = require('form-data');


export default class TestPost extends TestModule{    
    static instance : TestPost = new TestPost();
    async testAll() {        
        ///////////////////////////////////////////////////////////////////////
        // Post CRUD
        await TestPost.instance.test("writeThreadPost", {user : "bg", threadName : "spacehub", params : {
            title : "Hello World!",
            description : "Post Description",            
        } });
        for( let i = 0;  i < 10;    ++i) {
            await TestPost.instance.test("writeThreadPost", {user : "bg", threadName : "spacehub", params : {
                title : "Hello World! " + i,
                description : "Post Description",             
            } });
        }      

        await TestPost.instance.test("getThreadPostList", {threadName : "spacehub", lastItemId : -1, numOfPage : 100, sortType : "latest"});
        await TestPost.instance.test("getPostDetail", {user:"bg", postId : 3});
        await TestPost.instance.test("updatePost", {user : "bg", postId : 1, params : {
            title : "Update Hello World!",        
        } });

        
    }

TestCase() {
    this.register("writeThreadPost", async ({user, threadName, params})=>{        
        const info : LoginInfo =  await this.loginWith(user);
        await this._tc.post(`/api/threads/${threadName}/post`, params, info.token);
    });
    this.register("getThreadPostList", async ({user, threadName, lastItemId, numOfPage, sortType})=>{
        let token = "";
        if( user ) {
            const info : LoginInfo =  await this.loginWith(user);
            token = info.token;
        }
        await this._tc.get(`/api/threads/${threadName}/posts?lastItemId=${lastItemId}&numOfPage=${numOfPage}&sortType=${sortType}`, token);
    });
    this.register("getPostDetail", async ({user, postId})=>{
        const info : LoginInfo =  await this.loginWith(user);
        await this._tc.get(`/api/posts/${postId}`, info.token);
    });
    this.register("updatePost", async ({user, postId, params})=>{
        const info : LoginInfo =  await this.loginWith(user);
        await this._tc.put(`/api/posts/${postId}`, params,info.token);
    });
    this.register("archivePost", async ({user, postId})=>{
        const info : LoginInfo =  await this.loginWith(user);
        await this._tc.delete(`/api/posts/${postId}`, info.token);
    });  
}}


(async ()=>{
    


    await TestPost.instance.test("archivePost", {user : "bg", postId : 8});
    
})();
