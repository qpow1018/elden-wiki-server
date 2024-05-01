/**************************************************************************************************
    File Name	: checkerEx.ts
    Description
        Checker extention for project
        여기에 일반적인 체크 사항이 아니라 프로젝트에 특화되어 체크해야하는 사항을 기술한다.

    Update History
        2021.06         BGKim       Create
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Import Modules                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
import Checker from "./Checker";
import error from "./error";
import {PlatformType} from "@appTypes";


///////////////////////////////////////////////////////////////////////////////////////////////////
//									Class Implementation										 //
///////////////////////////////////////////////////////////////////////////////////////////////////

class CheckerEx extends Checker {
    public checkPlatformType(platform : PlatformType ) {
        switch(platform) {
            case PlatformType.youtube:
            case PlatformType.facebook:
            case PlatformType.instagram:
            case PlatformType.tiktok:
            case PlatformType.etc:
                break;
            default:
                throw error.newInstanceInvalidParameter(`Unknown platform.`);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Export  Modules                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////
const _instance = new CheckerEx();
export default _instance;
