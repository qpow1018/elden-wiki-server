/**************************************************************************************************
    File Name   : userDAO.ts

    Description :
        BG Programming test user DAO module

    Update History :
        2022.06     BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Required Modules                                             //
///////////////////////////////////////////////////////////////////////////////////////////////////
import { PoolClient } from "@appTypes";
import query from "./queryPostgres";
import {checker, postgresUtils} from "@stdlib";



///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Lastest Functions                                            //
///////////////////////////////////////////////////////////////////////////////////////////////////

async function signup(email : string, password : string) {
    "use strict";
    checker.assertStrings(email, password);
    return await postgresUtils.defaultQueryWithTransaction(async (client : PoolClient)=>{
        return  await query.signup(client, email, password);
    });
}




async function login(email : string) {
    "use strict";
    checker.assertStrings(email);    
    return await postgresUtils.defaultQuery( async (client : PoolClient) =>
        await query.login(client, email)
    );
}


async function getMyPage(userId : number) {
    "use strict";
    return await postgresUtils.defaultQuery(async (client : PoolClient)=>{
        return query.getMyPage(client, userId);
    });
}

export default {
    signup, login,
    getMyPage
}
