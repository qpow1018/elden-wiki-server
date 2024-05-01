/**************************************************************************************************
	File Name	: auth.js
	Description
	  Singleton class for authrity

	Update History
      2022.06            BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Required Modules                                             //
///////////////////////////////////////////////////////////////////////////////////////////////////
import { v4 as uuidv4 } from 'uuid';
import { assert } from './stdlib';


///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  	Auth Class                                     			 //
///////////////////////////////////////////////////////////////////////////////////////////////////

interface AuthData{
	lastAccessTime : number;
	userInfo : any;		// eslint-disable-line @typescript-eslint/no-explicit-any
}

class Auth {

	/*
	// Security token 으로 접속한 사용자 인증을 유지하여 사용자 확인의 부하를 줄인다.
	// Key : security token
	// value :
		{
			lastAccessTime 	: date ( ms, UTC ),
			...user infos
		}
	*/
	tableSecurityToken = new Map<string, AuthData>();


	// 사용자 인증 만료 알고리즘
	// 사용자 만료의 작업은 주기적으로 작업을 한다.
	// 즉, 호출 시 마다 작업하는 것이 아니라 사용자 인증 만료 작업을 한 마지막 시간을 기준으로 만료 기간을 체크한다.

	// 마지막에 인증 만료를 검색한 시간
	miliSecondLastExpireCheckTime = 0;


	// 인증 만료 체크 주기
	miliSecondExpireCheckPeriod =  60 * 60 * 1000;

	// Security key 인증 만료 시간
	miliSecondExpireTime = 7 * 24 * 60 * 60 * 1000;

	
	private _checkExpireTime() {
		const now = Date.now();
		if(  now - this.miliSecondLastExpireCheckTime < this.miliSecondExpireCheckPeriod )
			return ;

		this.miliSecondLastExpireCheckTime = now;
		for ( const securityToken in this.tableSecurityToken  ) {
			const authData  = this.tableSecurityToken.get(securityToken);
			const lastAccessTime = authData ? authData.lastAccessTime : 0;
			if( this.miliSecondExpireTime < now - lastAccessTime  )
				this._deleteSecurityToken( securityToken  );
		}
	}

	private _deleteSecurityToken( securityToken : string  ) {
		this.tableSecurityToken.delete(securityToken);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _insertSecurityTokenTable ( securityToken : string, userInfo : any ) {
		this.tableSecurityToken.set(securityToken, {
			lastAccessTime : Date.now(),
			userInfo
		});
	}


	public getSecurityToken( propertyName : string, id : string | number ) : string | null {
		this._checkExpireTime();
		for( const [securityToken, authData] of this.tableSecurityToken ) {
			if( authData.userInfo[propertyName] === id ) {
				authData.lastAccessTime = Date.now();
				console.log("return exists token");
				console.log(securityToken);
				return securityToken;
			}
		}
		
		return null;
	}

	// 사용자 정보를 메모리에 올리고 토큰을 발급한다.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public insertSecurityToken( userInfo : any ) : string {
		const securityToken = uuidv4();
		this._insertSecurityTokenTable( securityToken, userInfo );
		return securityToken;
	}

	// _utils 함수에서 헤더에서 전송받은 security token 이 유효한지 확인하는데 사용
	public isValidSecurityToken( securityToken : string ){
		this._checkExpireTime();
		return this.tableSecurityToken.get(securityToken) !== undefined;
	}

	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getUserInfo( securityToken : string ) : any | undefined {		
		this._checkExpireTime();
		// Security token을 사용하면 마지막 접근 시간을 갱신한다
		const authData = this.tableSecurityToken.get(securityToken);
		if( authData ) {
			authData.lastAccessTime = Date.now();
			return authData.userInfo;
		}
		else
			return undefined;
	}


	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getUserInfoWithSecurityToken( securityToken : string ) : any {
		return this.getUserInfo(securityToken);
	}

	public updateBadgeDisplayName(badgeId : number, newDisplayName : string){		
		const token = this.getSecurityToken("badgeId", badgeId);		
		assert( token !== null );
		const userInfo = this.getUserInfo(token);
		userInfo.badgeInfo.displayName = newDisplayName;
		this.tableSecurityToken.set(token, {lastAccessTime : Date.now(), userInfo} );	
	}
}





///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Module Exports					                             //
///////////////////////////////////////////////////////////////////////////////////////////////////
const _auth = new Auth();
export default _auth;
