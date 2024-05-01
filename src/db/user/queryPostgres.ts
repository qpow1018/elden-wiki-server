/**************************************************************************************************
    File Name   : queryPostgres.ts

    Description :
        BG Programming test user postgresql query module

    Update History :
        2022.06     BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Import Modules                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////

import { PoolClient } from "@appTypes";
import { error, assert } from "@stdlib";


///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Latest Functions                                             //
///////////////////////////////////////////////////////////////////////////////////////////////////

async function signup(client : PoolClient, email : string, password : string) {
    await client.query (
        `INSERT INTO users(email, password) VALUES($1, $2) `,
        [email, password]
    );
}

async function login(client : PoolClient, email : string) {
    const resultSet = await client.query (
        `SELECT id as "userId", email, password FROM users WHERE email = $1 `
        ,[email]
    );
    if( resultSet.rowCount === 0 )
        throw error.newInstanceNotMemberError();
    return resultSet.rows[0];
}

async function getMyPage(client : PoolClient, userId : number) {
    const resultSet = await client.query (
        `SELECT email, password FROM users WHERE id = $1 `
        ,[userId]
    );
    if( resultSet.rowCount === 0 ) {
        // 해킹 시도가 의심됨
        // user id 가 잘못되었을 경우는 auth 인증 모듈에서 걸러져야 한다.
        // 정상적인 상황에서 여기 명령줄까지 오는 경우는 없다.
        assert(false);
        throw error.newInstanceBadRequest("hum.... I watch you.");
    }
    return resultSet.rows[0];
}

export default {
    signup, login, getMyPage

}
