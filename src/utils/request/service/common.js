import up from "../upload";
import {getPassword} from "../../base";
import post from "../post";

export default {
    login:data=>{
        let form=JSON.stringify(data)
        form=JSON.parse(form)
        form.password=getPassword(data.password)
        return post('api/login',form)
    },
    logout:data=>post('api/logout',data),
    upload:(file,config)=>{
        config=config||{}
        config.data=config.data||{}
        config.data.name=config.data.name||'file'
        return up('api/upload',file,config)
    },
}
