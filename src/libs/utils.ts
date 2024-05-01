/**************************************************************************************************
    File Name	: utils.ts
    Description
      API Module

    Update History
      2022.06            BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Import Modules                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import error  from "./error";



///////////////////////////////////////////////////////////////////////////////////////////////////
//									Class Implementation										 //
///////////////////////////////////////////////////////////////////////////////////////////////////
class  Utils {
    // not include max
    private _createRandomInteger(min : number, max : number) {
        return Math.floor( Math.random() * (max-min) + min );
    }


    public createRandomInteger(min : number, max : number) : number {
        return this._createRandomInteger(min, max);
    }

    // https://www.ascii-code.com/
    // from 33 to 126
    public createRandomChar() : string {
        return String.fromCharCode( this._createRandomInteger(33, 127));
    }


    public createRandomText ( len? : number ) : string {
        let text = "";
        if( len === undefined )
            len = 32;

        // 233a0953-6a95-4fa3-aae0-64b965985ee8
        // 012345678901234567890123456789012345
        do {
            const strUuid = uuidv4();                
            text = text + strUuid.substring(0,8) + strUuid.substring(9,13) + strUuid.substring(14,18) + strUuid.substring(19,23) + strUuid.substring(24);        
        } while( text.length < len )

        return text.substring(0,len);
    }

    public createRandomNumberString(len : number) : string {
        if( !len )
            len = 4;

        let number = "";
        for( let i =0;	i < len;	++i )
            number +=  Math.floor( Math.random() * 10 ) ;
        return number;
    }


    public createRandomNumberText(digit : number) : string {
        let multiple10 = 1;
        for( let i = 0;		i < digit;	++i )
            multiple10 = multiple10 * 10;

        let nRandomNumber = Math.random() * multiple10;
        nRandomNumber = Math.floor(nRandomNumber);

        let strRandomNumber = nRandomNumber.toString();
        while( strRandomNumber.length < digit )
            strRandomNumber = '0' + strRandomNumber;

        return strRandomNumber;
    }



    public createUuid() : string {
        const strUuid = uuidv4();
        return strUuid.substring(0,8) + strUuid.substring(9,13) + strUuid.substring(14,18) + strUuid.substring(19,23) + strUuid.substring(24,36);
    }



    public createUuidV4() : string {
        return uuidv4();
    }


    public extractFileNameWithUrl(url : string) : string {
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //return
        return url;
    }

    public floorEx( x : number, n : number ) : number {
        const nn = Math.pow(10, n);
        return Math.floor( x * nn ) / nn;
    }

    public getDateString( utc : number ) : string {
        const date = new Date(utc*1000);
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
        const dd  = date.getDate().toString();
        return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]);
    }



    public checkEmailFormat(email : string) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( !re.test(String(email).toLowerCase()) )
            throw error.newInstanceBadRequest("Invalid email format.");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public uniq( arr : Array<any> ) : Array<any> {
        return Array.from(new Set(arr));
    }



    public sleep( ms : number ) {
        "use strict";
        return new Promise(resolve=>{
             setTimeout(resolve,ms)
        });
    }



    public createRandomNicknameWithKorean() : string {
        function _getRandomItem(arr : Array<string>) : string {
            return arr[ Math.floor( Math.random() * arr.length )];
        }

        const arAdjective = [
            "용감한", "행복한", "도도한", "겸손한", "예의바른", 	"사악한", "무자비한", "강한", "게으른", "졸린",
            "이상한", "발정난", "가냘픈", "슬픈", "착한", 		 "연약한", "무례한", "정직한", "바보같은", "귀여운",
            "커여운", "가녀린", "찬란한", "멋진", "잘생긴",		"당당한", "가소로운", "앙증맞은", "재빠른", "부지런한",
            "날랜", "날아오른 ", "목마른", "따뜻한", "힘센",		"희미한", "따사로운", "방망이깍는", "간사한", "간절한",
            "짖궃은", "킹받은", "감동한", "훌륭한", "거만한",		"능청스러운", "무서운", "느긋한", "강건한", "강단있는",
            "강렬한", "편안한", "강려ㅋ한", "창렬한", "용맹한",		"수줍은", "대담한", "미친", "소심한", "어여쁜",
            "웃긴", "깔깔대는", "껄렁한", "심드렁한", "능청스런",	"피곤한", "히히덕대는", "노란", "괴로운", "솔직한",
            "정렬적인", "지랄맞은", "느끼한"
        ];

        const arNone = [
            "고양이", "직박구리", "똘똘이", "사자", "네모",			"뽀로로", "개미", "사마귀", "오리", "두꺼비",
            "올챙이", "이상해씨", "꼬부기", "피카츄", "라이츄",		"잠만보", "파이어", "뮤", "해루미", "닌자",
            "킹드라",  "히드라", "드!라!군!", "시즈탱크", "루팡",	"엑스맨", "스파이더맨", "삐에로", "흑우", "사기꾼",
            "햄스터", "거북이", "고릴라", "배짱이", "사슴", 		"주작", "청룡", "도야지", "원숭이", "궁수",
            "봄", "여름", "가을", "겨울", "인생",					"아침", "영광", "북극성", "개구쟁이", "노인",
            "형제", "자매", "여우", "공작", "판다", 				"캥거루", "코알라", "나무늘보", "물개", "폭군",
            "레드", "블루", "옐로", "그린", "무지개",				"우산", "밤", "도토리", "다람쥐", "펭귄",
            "펭수", "병아리", "솔로", "도박사", "찐따",				"개나리", "오빠", "도사", "여포", "관우",
            "장비", "돌아이", "하루", "카사노바", "양치기소년",		"강아지", "무당", "장군", "베놈", "조커"
        ];
        return _getRandomItem(arAdjective) + "" + _getRandomItem(arNone);
    }

}


///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Module Exports					                             //
///////////////////////////////////////////////////////////////////////////////////////////////////
export default Utils;
