import put from '../put'
import {getPassword} from "../../base";

export default {
    save:data=>{
        let form={
            avatar:data.avatar,
            password:data.password?getPassword(data.password):'',
        }
        return put('api/account/1',form)
    },
}
