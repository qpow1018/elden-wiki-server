/**************************************************************************************************
    File Name   : error.ts

    Description :
	  Project error definition

    Update History
      2022.06            BGKim       Create
**************************************************************************************************/
import assert from "assert";

// Reference : http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
const responseCodes = {
	RESPONSE_CODE_OK : 200,
	RESPONSE_CODE_NOT_MODIFIED : 304,
	RESPONSE_BAD_REQUEST : 400,
	RESPONSE_CODE_UNAUTHORIZED : 401,
	RESPONSE_CODE_FORBIDDEN : 403,
	RESPONSE_CODE_NOT_FOUND : 404,
	RESPONSE_CODE_INTERNAL_SERVER_ERROR : 500
};

const errorCodes = {
	// 18xx 번대 : 자주 일어나는 특수 코드
	ERROR_CODE_INVALID_USER_ID_OR_PASSWORD : 1818,
	ERROR_CODE_INVALID_PARAMETERS : 1828,
	ERROR_CODE_INTERNAL_SERVER_ERROR : 1838,
	ERROR_CODE_DATA_NOT_FOUND : 1839,
	ERROR_CODE_VERSION_CHECK_FAILED : 1840,
	// 2000 번대 : 인증 및 권한 관련
	ERROR_CODE_INVALID_SECURITY_TOKEN : 2000,
	ERROR_CODE_DIFFERENCE_USER_ID_AND_SECURITY_TOKEN  : 2001,
	ERROR_CODE_FORBIDDEN : 2002,
	ERROR_CODE_FORBIDDEN_POLICY_NOT_AGREE : 2003,
	ERROR_CODE_EXPIRED : 2004,
	ERROR_CODE_MAIL_LINK_EXPIRED : 2005,
	ERROR_CODE_USER_RESTRICTED : 2006,


	// 3000 번대 : 유저 관련
	ERROR_CODE_USER_NOT_FOUND : 3000,
	ERROR_CODE_CREATOR_CHANNEL_NOT_FOUND : 3001,
	ERROR_CODE_CREATOR_CHANNEL_NO_VIDEO : 3002,
	ERROR_CODE_CREATOR_NOT_ENOUGH_SUBSCRIBERS : 3003,
	ERROR_CODE_CREATOR_CHANNEL_ALREADY_SIGNUP : 3004,
	ERROR_CODE_CREATOR_NOT_MATCH_CHANNEL_BEFORE : 3005,
	ERROR_CODE_USER_NOT_EXISTS : 3006,
	ERROR_CODE_USERNAME_ALREADY_EXISTS : 3007,
	ERROR_CODE_EMAIL_ALREADY_EXISTS : 3008,

	// 4000 번대 : 일반
	ERROR_DUPLICATE_NAME : 4000,
	ERROR_DUPLICATE_DATA : 4001,
	ERROR_BAD_REQUEST : 4002,
};

class AppError {
	httpResponseCode : number;
	code : number;
	message : string;
	detailMessage? : string;

	constructor(responseCode : number, appErrorCode : number, detailMessage? : string) {
		if( detailMessage === undefined )
			detailMessage = "";

		this.httpResponseCode = responseCode;
		this.code = appErrorCode;
		this.message = getErrorString( appErrorCode );
		this.detailMessage = detailMessage;
	}
}


function newInstanceInternalServerError( message? : string ) {
    "use strict";
	return new AppError(responseCodes.RESPONSE_CODE_INTERNAL_SERVER_ERROR, errorCodes.ERROR_CODE_INTERNAL_SERVER_ERROR, message);
}

function newInstanceForbiddenError(message? : string) {
    "use strict";
	return new AppError(responseCodes.RESPONSE_CODE_FORBIDDEN, errorCodes.ERROR_CODE_FORBIDDEN, message );
}

function newInstanceNotMemberError() {
    "use strict";
	return new AppError(responseCodes.RESPONSE_CODE_UNAUTHORIZED, errorCodes.ERROR_CODE_INVALID_SECURITY_TOKEN );
}

// 약관등에 동의하지 않음으로써 접근을 허용하지 않는다.
function newInstanceForbiddenWithPolicyNotAgreeError()
{
    "use strict";
	return new AppError(responseCodes.RESPONSE_CODE_FORBIDDEN, errorCodes.ERROR_CODE_FORBIDDEN_POLICY_NOT_AGREE );
}

function newInstanceNotFoundData(message? : string)
{
	"use strict";
	return new AppError(responseCodes.RESPONSE_BAD_REQUEST, errorCodes.ERROR_CODE_DATA_NOT_FOUND, message );
}

function newInstanceInvalidParameter(message?:string)
{
	"use strict";
	return new AppError(responseCodes.RESPONSE_BAD_REQUEST, errorCodes.ERROR_CODE_INVALID_PARAMETERS, message);
}

function newInstanceDuplicateData()
{
	"use strict";
	return new AppError(responseCodes.RESPONSE_BAD_REQUEST, errorCodes.ERROR_DUPLICATE_DATA );
}

function newInstanceExpired()
{
	"use strict";
	return new AppError(responseCodes.RESPONSE_CODE_FORBIDDEN, errorCodes.ERROR_CODE_EXPIRED );
}

function newInstanceBadRequest( message? : string ) {
	"use strict";
	return new AppError(responseCodes.RESPONSE_BAD_REQUEST, errorCodes.ERROR_BAD_REQUEST, message );
}

function newInstanceUserRestricted( message? : string ) {
	"use strict";
	return new AppError(responseCodes.RESPONSE_CODE_FORBIDDEN, errorCodes.ERROR_CODE_USER_RESTRICTED, message );
}

function newInstanceInvaildUserIdOrPassword( message? : string ) {
	"use strict";
	return new AppError(responseCodes.RESPONSE_CODE_UNAUTHORIZED, errorCodes.ERROR_CODE_INVALID_USER_ID_OR_PASSWORD, message );
}


function getErrorString( errorCode : number ) {
    "use strict";
	switch( errorCode )
	{
		case errorCodes.ERROR_CODE_INVALID_USER_ID_OR_PASSWORD :
			return "Invalid user id or password.";
		case errorCodes.ERROR_CODE_INVALID_PARAMETERS :
			return "Invalid request parameters";
		case errorCodes.ERROR_CODE_INTERNAL_SERVER_ERROR	:
			return "Internal server error";
		case errorCodes.ERROR_CODE_INVALID_SECURITY_TOKEN :
			return "Session expired. Please log out, and try log in again.";
		case errorCodes.ERROR_CODE_DIFFERENCE_USER_ID_AND_SECURITY_TOKEN :
			return "Difference user id and security token.";
		case errorCodes.ERROR_CODE_FORBIDDEN :
			return "Forbidden";
		case errorCodes.ERROR_CODE_FORBIDDEN_POLICY_NOT_AGREE :
			return "Policy Not Agree";
		case errorCodes.ERROR_CODE_USER_NOT_FOUND :
			return "User not found";
		case errorCodes.ERROR_CODE_DATA_NOT_FOUND :
			return "Data not found";
		case errorCodes.ERROR_DUPLICATE_NAME :
			return "Duplicate Name";
		case errorCodes.ERROR_DUPLICATE_DATA :
			return "Duplicate Data";
		case errorCodes.ERROR_CODE_VERSION_CHECK_FAILED:
			return "Version check failed.";
		case errorCodes.ERROR_CODE_EXPIRED:
			return "The Date has expired.";
		case errorCodes.ERROR_BAD_REQUEST:
			return "Bad Request";
		case errorCodes.ERROR_CODE_CREATOR_CHANNEL_NOT_FOUND :
			return "Channel not found";
		case errorCodes.ERROR_CODE_CREATOR_CHANNEL_NO_VIDEO :
			return "No video";
		case errorCodes.ERROR_CODE_CREATOR_NOT_ENOUGH_SUBSCRIBERS:
			return "You should need at least 1,000 subscribers on your Youtube channel to join our community.";
		case errorCodes.ERROR_CODE_CREATOR_CHANNEL_ALREADY_SIGNUP:
			return "this channel is signup alredy";
		case errorCodes.ERROR_CODE_MAIL_LINK_EXPIRED:
			return "Mail link expired.";
		case errorCodes.ERROR_CODE_CREATOR_NOT_MATCH_CHANNEL_BEFORE :
			return "Not match channel before.";
		case errorCodes.ERROR_CODE_USER_NOT_EXISTS :
			return "User not founded!";
		case errorCodes.ERROR_CODE_USERNAME_ALREADY_EXISTS :
			return "Username already exists";
		case errorCodes.ERROR_CODE_EMAIL_ALREADY_EXISTS :
			return "Email already exists";
		case errorCodes.ERROR_CODE_USER_RESTRICTED :
			return "User restricted.";
		default :
			assert(false);
			return "Unknown Error Code";
	}
}

export default  {
    AppError,
    newInstanceNotMemberError,
	newInstanceInternalServerError,
	newInstanceForbiddenError,
	newInstanceNotFoundData,
	newInstanceInvalidParameter,
	newInstanceDuplicateData,
	newInstanceForbiddenWithPolicyNotAgreeError,
	newInstanceExpired,
	newInstanceBadRequest,
	newInstanceUserRestricted,
	newInstanceInvaildUserIdOrPassword,
	errorCodes,
	responseCodes,
	getErrorString
}
