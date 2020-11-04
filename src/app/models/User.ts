import { UserInfo } from './UserInfo';

export class User {
    id: number;
    username: string;
    password: string
    id_user_info: UserInfo;
    id_role: Object;
    token;

    constructor(username?, password?,userInfo?:UserInfo) {

        this.username = username;
        this.password = password;
        this.id_user_info = userInfo

    }

}