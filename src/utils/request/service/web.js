import get from '../get'
import post from '../post'
import put from '../put'

export default {
    list:params=>get('api/web',params),
    info:params=>get('api/web/'+params.id),
    add:data=>post('api/web',data),
    edit:data=>put('api/web/'+data.id,data),
    save:function (data) {
        if(data.id){
            return this.edit(data)
        }
        return this.add(data)
    },
    configList:params=>get('api/web_config',params),
}
