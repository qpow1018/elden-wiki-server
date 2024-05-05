import { DefaultUserApiParams, RouterParameters, UserApiParams, UserInfo } from "@appTypes";
import { checker, error, utils } from "@stdlib";
import testDAO from "@/db/test/testDAO";


export default function route({ api }: RouterParameters) {
    api.guest.get   ("/api/test",               dbTest);
}

// ------------------------------------------------------
async function dbTest() {
    return await testDAO.dbTest();
}
