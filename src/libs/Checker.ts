/**************************************************************************************************
    File Name	: checker.ts
    Description
      Singleton class for parameter check
      
    Update History
      2022.06            BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Import Modules                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
import assert from "assert";
import error  from "./error";
import auth  from "./auth";


///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Class Implementation                                         //
///////////////////////////////////////////////////////////////////////////////////////////////////
class Checker{
    public checkSecurityTokenAndRequiredParameter( securityToken : string | null ) : string{
        "use strict";
        if( securityToken === null || auth.isValidSecurityToken( securityToken ) === false )
            throw new error.AppError( error.responseCodes.RESPONSE_CODE_UNAUTHORIZED, error.errorCodes.ERROR_CODE_INVALID_SECURITY_TOKEN );
        return securityToken;
    }

    public checkEmailFormat(email : string) {
        "use strict";
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( !re.test(String(email).toLowerCase()) )
            throw error.newInstanceBadRequest("Invalid email format.");
    }


    public checkURL(url : string) {
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if( !!pattern.test(url) === false ) {
          console.log("Invalid URL");
          throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS, "Invalid URL" );
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public checkRequiredParameters( ...args : any[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            if( args[i] === undefined || args[i] === null ) {
                console.log("Fail - checkRequiredParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }

    public checkRequiredBooleanParameters( ...args : boolean[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== Boolean ) {
                console.log("Fail - checkRequiredBooleanParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }

    public checkRequiredStringParameters( ...args : string[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== String ||  args[i].length === 0 ) {
                console.log("Fail - checkRequiredStringParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }

    
    public checkRequiredStringNumberParameters( ...args : string[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== String ||  args[i].length === 0 ) {
                console.log("Fail - checkRequiredStringNumberParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }

            for( let j = 0;     j < args[i].length;     ++j ) {            
                if( !('0' <= args[i][j] && args[i][j] <= '9')  ) {
                    console.log("Fail - checkRequiredStringNumberParameters : " + i);                    
                    throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
                }
            }
        }
    }

    // minimum string length < real string length
    public checkRequiredStringMinimumLength(s : string, len : number) {
        if( s === undefined || s === null || s.constructor !== String || s.length <= len )
            throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS, "Failed : checkStringMinimumLength" );
    }




    public checkPathParameters( ...args : string[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== String ||
                args[i] === 'undefined' || args[i] === 'null'
            ) {
                console.log("Fail - checkPathParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }

    public checkRequiredNumberParameters( ...args : number[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== Number || isNaN(args[i]) === true )  {
                console.log("Fail - checkRequiredNumberParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS);
            }
        }
    }

    // 0은 허용하지 않는다.
    public checkRequiredPositiveIntegerParameters(...args : number[]) {
        for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined || args[i] === null || args[i].constructor !== Number || !Number.isInteger(args[i]) || args[i] < 1) {
                console.log('Fail - checkRequiredPositiveIntegerParameters : ' + i);
                throw new error.AppError(error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS);
            }
        }
    }

    public checkRequiredNumberArrayParameters( ...args : Array<number>[] ) {
        for( let i = 0;		i < args.length;		++i )  {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== Array   )  {
                console.log("Fail - checkRequiredNumberArrayParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }

            const array = args[i];
            for( let idx = 0;		idx < array.length;		++idx  ) {
                if( array[idx] === undefined || array[idx] === null || array[idx].constructor !== Number   )  {
                    console.log("Fail - checkRequiredNumberArrayParameters - intenal param : " + idx);
                    throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
                }
            }
        }
    }

    public checkRequiredStringArrayParameters( ...args : Array<string>[] ) {
        for( let i = 0;		i < args.length;	++i )  {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== Array   )  {
                console.log("Fail - checkRequiredStringArrayParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }

            const array = args[i];
            for( let idx = 0;		idx < array.length;		++idx  ) {
                if( array[idx] === undefined || array[idx] === null || array[idx].constructor !== String   )  {
                    console.log("Fail - checkRequiredStringArrayParameters - intenal param : " + idx);
                    throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
                }
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public checkRequiredArrayParameters( ...args : Array<any>[] ) {
        for( let i = 0;     i < args.length;   ++i ) {
            if( args[i] === undefined || args[i] === null || args[i].constructor !== Array ) {
                console.log("Fail - checkRequiredArrayParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }

    public checkOptionalPositiveIntegerParameters( ...args : Array<number|undefined|null> ) {
        for (let i = 0; i < args.length; i++) {

            // conflict lint parser and typescript compiler disable not null assertion
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if ( args[i] && args[i]!.constructor === Number && Number.isInteger(args[i]) && args[i]! < 1) {
                console.log('Fail - checkOptionalPositiveIntegerParameters : ' + i);
                throw new error.AppError(error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS);
            }
        }
    }


    public checkOptionalNumberParameters ( ...args : (number|undefined|null)[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            // conflict lint parser and typescript compiler disable not null assertion
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if( args[i] !==  undefined && args[i] !==  null && args[i]!.constructor !== Number  ) {
                console.log("Fail - checkOptionalNumberParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }


    public checkOptionalStringParameters ( ...args : (string|undefined|null)[] ) {
        for( let i = 0;		i < args.length;	++i ) {
            // conflict lint parser and typescript compiler disable not null assertion
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if( args[i] && args[i]!.constructor !== String  ) {
                console.log("Fail - checkOptionalStringParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }

    public checkOptionalBooleanParameters( ...args : (boolean|undefined|null)[] ) {
        for( let i = 0;		i < args.length;		++i ) {
            // conflict lint parser and typescript compiler disable not null assertion
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if( args[i] && args[i]!.constructor !== Boolean  ) {
                console.log("Fail - checkOptionalBooleanParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public checkOptionalArrayParameters( ...args : (Array<any>|undefined|null)[] ) {        
        for( let i = 0;		i < args.length;	++i )  {
            // conflict lint parser and typescript compiler disable not null assertion
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if( args[i] && args[i]!.constructor !== Array ) {
                console.log("Fail - checkRequiredArrayParameters : " + i);
                throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
            }
        }
    }


    public checkOptionalNumberArrayParameters( ...args : (Array<number>|undefined|null)[] ) {
        for( let i = 0;		i < args.length;		++i )  {
            if( args[i] ) {
                // conflict lint parser and typescript compiler disable not null assertion
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                if( args[i]!.constructor === Array  )  {
                    // conflict lint parser and typescript compiler disable not null assertion
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const array : Array<any> = args[i]!;    // eslint-disable-line @typescript-eslint/no-explicit-any
                    for( let idx = 0;		idx < array.length;		++idx  ) {
                        if( array[idx] === undefined || array[idx] === null || array[idx].constructor !== Number   )  {
                            console.log("Fail - checkOptionalNumberArrayParameters - intenal param : " + idx);
                            throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
                        }
                    }
                } else  {
                    console.log("Fail - checkOptionalNumberArrayParameters : " + i);
                    throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
                }
            } // end if( arguments[i] ) {
        }
    }


    public checkOptionalStringArrayParameters ( ...args : (Array<string>|undefined|null)[] ) {
        for( let i = 0;		i < args.length;	++i )  {
            if( args[i] ) {
                // conflict lint parser and typescript compiler disable not null assertion
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                if( args[i]!.constructor === Array  )  {
                    // conflict lint parser and typescript compiler disable not null assertion
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const array : Array<any> = args[i]!;    // eslint-disable-line @typescript-eslint/no-explicit-any
                    for( let idx = 0;		idx < array.length;		++idx  ) {
                        if( array[idx] === undefined || array[idx] === null || array[idx].constructor !== String   )  {
                            console.log("Fail - checkOptionalStringArrayParameters - intenal param : " + idx);
                            throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
                        }
                    }
                } else  {
                    console.log("Fail - checkOptionalStringArrayParameters : " + i);
                    throw new error.AppError( error.responseCodes.RESPONSE_BAD_REQUEST, error.errorCodes.ERROR_CODE_INVALID_PARAMETERS );
                }
            } // end if( arguments[i] ) {
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public checkOptionalNotIncludeSelf (arr : Array<any>, id : string | number) {
        if( !arr || arr.constructor !== Array )
            return ;

        if( arr.includes(id) )
            throw error.newInstanceBadRequest("Not allow including self");
    }

    

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public assertObjects ( ...args : any[] ) {
        for( let i = 0;     i < args.length;   	++i )
            assert( args !== null && args !== undefined );
    }

    public assertNumbers ( ...args : number[] ) {
        for( let i = 0;     i < args.length;   	++i )
            assert( args[i].constructor === Number );
    }

    public assertBooleans ( ...args : number[] ) 	{
        for( let i = 0;     i < args.length;   	++i )
            assert( args[i].constructor === Boolean );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public assertArrays ( ...args : Array<any>[] ) {
        for( let i = 0;     i < args.length;   	++i )
            assert( args[i].constructor === Array );
    }

    public assertStrings ( ...args : string[]) {
        for( let i = 0;     i < args.length;   	++i )
            assert( args[i].constructor === String );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public assertFunctions ( ...args : any[] ) {
        for( let i = 0;     i < args.length;   ++i )
            assert( args[i].constructor === Function );
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Export  Modules                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////
export default Checker;
