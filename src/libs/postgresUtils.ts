/**************************************************************************************************
    File Name   : postgresUtils.ts

    Description :
        Postgresql Utils

    Update History
        2021.06         BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Import Modules                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
import pg, { Pool, PoolClient } from 'pg';
import assert from "assert";


///////////////////////////////////////////////////////////////////////////////////////////////////
//									Init module 											     //
///////////////////////////////////////////////////////////////////////////////////////////////////
pg.types.setTypeParser(pg.types.builtins.INT8, (value)=>{
    return parseInt(value);
});

const pool = new Pool({
  user: 'bg',
  host: 'localhost',
  database: 'bg_programming_skeleton',
  password: '1234'
});


///////////////////////////////////////////////////////////////////////////////////////////////////
//									Class Implementation										 //
///////////////////////////////////////////////////////////////////////////////////////////////////

class QueryBuildData {
    _client : PoolClient;
    _query : string;
    _params : Array<any>;   // eslint-disable-line @typescript-eslint/no-explicit-any

    constructor(client : PoolClient) {
        this._client = client;
        this._query = "";
        this._params = [];
    }

    idx() {
        return "$" + (this._params.length + 1).toString();
    }

    add(query : string) {
        this._query += query;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    withParam(query : string, param : any) {
        if( param === undefined )
            return ;
        this.add(query);
        this._params.push(param);
    }

    async execute() {
        assert(this._client);
        // console.log(this._query);
        // console.log(this._params);
        return await this._client.query(this._query, this._params);
    }
}

interface CallbackPostgres {
    (client : PoolClient) : any;    // eslint-disable-line @typescript-eslint/no-explicit-any
}

class DB_Utils {
    public makeQuery (client : PoolClient)  {
        return new QueryBuildData(client);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async defaultQuery (callback : CallbackPostgres) : Promise<any> {
        const client = await pool.connect();
        try {
            return await callback(client);
        } finally {
            client.release();
        }
    }

    public async defaultQueryWithTransaction(callback : CallbackPostgres)  {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT')
            return result;
        } catch(e) {
            await client.query('ROLLBACK');
            throw e;
        }finally {
            client.release();
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Export  Modules                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////
const _db_utilsInstance = new DB_Utils();
export default _db_utilsInstance;
