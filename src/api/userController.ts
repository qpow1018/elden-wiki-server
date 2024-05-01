/**************************************************************************************************
    File Name   : userController.ts

    Description :
        BG Programming test user api controller

    https://github.com/BG-Programming/node-express-typescript-skeleton

    Update History :
        2022.06     BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Required Modules                                             //
///////////////////////////////////////////////////////////////////////////////////////////////////
import { DefaultUserApiParams, RouterParameters, UserApiParams, UserInfo } from "@appTypes";
import userDAO from "@/db/user/userDAO";
import auth from "@libs/auth.js";
import {checker, error, utils} from "@stdlib";
import argon2 from "argon2";




///////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////
export default function route({api}:RouterParameters) {
    // Sign up & Sign in 
    api.guest.post  ("/api/user/sign-up",       signup);
    api.guest.post  ("/api/user/login",         login);
    
    // My Page
    api.get         ("/api/mypage",             getMyPage);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Lastest Functions                                            //
///////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @openapi
 * /api/user/sign-up:
 *   post:
 *     tags:
 *       - "USER"
 *     summary: Signup
 *     produces:
 *       - application/json
 *     description: Signup
 *     requestBody:
 *       required: true
 *       content :
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                  type : string
 *                  description : email
 *                  example : "bg@bgprogramming.com"
 *               password:
 *                  type : string
 *                  description : password
 *                  example : "myPassword"
 *
 *     responses:
 *       200:
 *        description: Signup
 *
 */
async function signup({body  } : UserApiParams<signupBodyParameter>) {    
    checker.checkRequiredStringParameters(body.email, body.password);
    const hashedPassword = await argon2.hash(body.password);
    await userDAO.signup(body.email, hashedPassword);
}
interface signupBodyParameter {
    email: string;
    password: string;
}


/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - "USER"
 *     summary: Login
 *     produces:
 *       - application/json
 *     description: Login
 *     requestBody:
 *       required: true
 *       content :
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                  $ref: '#/components/requestBodies/email'
 *               password:
 *                  type : string
 *                  description : password
 *                  example : "myPassword"
 *
 *     responses:
 *       200:
 *        description: Token and UserInfo.
 *        content :
 *          application/json:
 *            schema:
 *              properties:
 *                bgData:
 *                  type : object
 *                  properties:
 *                      token:
 *                        type : string
 *                        description : access token
 *                        example : "ef26b454-88da-4b2d-9e55-75c91f3cf2de"
 *                      userInfo:
 *                        type : object
 *                        description : user info
 *                        properties:
 *                          email :
 *                            type : string
 *                            description : email
 *                            example : "bg@bgprogramming.com"
 *
 */
async function login({body} : UserApiParams<loginBodyParameter>) {
    checker.checkRequiredStringParameters(body.email, body.password);

    const jsonUserInfo =  await userDAO.login(body.email);
    if (await argon2.verify(jsonUserInfo.password, body.password)) {        
        delete jsonUserInfo.password;
        const strSecurityToken = _loginAndIssueToken(jsonUserInfo);
        return {
            userInfo : jsonUserInfo,
            token : strSecurityToken
        }
    }else {
        throw error.newInstanceInvaildUserIdOrPassword();
    }
}
interface loginBodyParameter {
    email: string;
    password: string;
}


function _loginAndIssueToken(jsonUserInfo : UserInfo) {
    let strSecurityToken = auth.getSecurityToken( "userId", jsonUserInfo.userId );
    if( strSecurityToken === null )
        strSecurityToken = auth.insertSecurityToken(jsonUserInfo);
    return strSecurityToken;
}




/**
 * @openapi
 * /api/mypage:
 *   get:
 *     tags:
 *       - "USER"
 *     summary: Get MyPage Info
 *     produces:
 *       - application/json
 *     description: Get MyPage Info
 *
 *     responses:
 *       "200":
 *        description: user profile updated
 *        content :
 *          application/json:
 *            schema:
 *              properties:
 *                bgData:
 *                  type : object
 *                  properties:
 *                    userInfo:
 *                      $ref: '#/components/schemas/UserInfo'
 *     security:
 *     - token: []
 *
 */
async function getMyPage({userInfo} : DefaultUserApiParams) {
    return await userDAO.getMyPage(userInfo.userId);
}
