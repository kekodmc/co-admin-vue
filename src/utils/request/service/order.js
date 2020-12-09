import get from '../get'
import post from '../post'
import put from '../put'

export default {
    list:params=>get('api/order',params),
    info:params=>get('api/order/'+params.id),
    save:data=>put('api/order/'+data.id,data)
}
