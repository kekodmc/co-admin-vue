import get from '../get'
import post from '../post'
import put from '../put'
import del from '../delete'

export default {
    list:params=>get('api/power',params),
    info:params=>get('api/power/'+params.id),
    add:data=>post('api/power',data),
    edit:data=>put('api/power/'+data.id,data),
    save:function (data) {
        if(data.id){
            return this.edit(data)
        }
        return this.add(data)
    },
    del:data=>del('api/power/'+data.id),
    mod:params=>get('api/power/mod',params),
}
