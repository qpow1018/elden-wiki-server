/**************************************************************************************************
    File Name   : postgresCommonQueries.ts

    Description :
        
    Update History   
      2023.09           BGKim       Create  
**************************************************************************************************/


export default class PostgresCommonQueries {
    public time2utc(columnName: string) {
        return `extract(epoch from ${columnName} at time zone 'utc')::BIGINT`;
    }
    
    public date2iso8601(columnName: string) {
        return `to_char (${columnName}, 'YYYY-MM-DD')`;
    }
}

