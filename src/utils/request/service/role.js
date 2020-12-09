import get from '../get'
import post from '../post'
import put from '../put'
import del from '../delete'

export default {
    list:params=>get('api/role',params),
    info:params=>get('api/role/'+params.id),
    add:data=>post('api/role',data),
    edit:data=>put('api/role/'+data.id,data),
    save:function (data) {
        if(data.id){
            return this.edit(data)
        }
        return this.add(data)
    },
    del:data=>del('api/role/'+data.id),
    power:params=>get('api/role/power',params)
}
