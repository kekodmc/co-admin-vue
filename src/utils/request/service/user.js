import get from '../get'
import post from '../post'
import put from '../put'

export default {
    list:params=>get('api/user',params),
    info:params=>get('api/user/'+params.id),
    web:params=>get('api/user/web',params),
    resetPassword:data=>put('api/user/reset_password/'+data.id),
}
