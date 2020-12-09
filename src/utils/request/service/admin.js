import get from '../get'
import post from '../post'
import put from '../put'
import del from '../delete'
import {getPassword} from "../../base";

export default {
    list:params=>get('api/admin',params),
    info:params=>get('api/admin/'+params.id),
    add:data=>post('api/admin',data),
    edit:data=>put('api/admin/'+data.id,data),
    save:function (data) {
        let form=JSON.stringify(data)
        form=JSON.parse(form)
        if(data.password){
            form.password=getPassword(data.password)
        }
        if(data.id){
            return this.edit(form)
        }
        return this.add(form)
    },
    del:data=>del('api/admin/'+data.id),
    role:params=>get('api/admin/role',params),
    disable:data=>post('api/admin/disable',data),
}
