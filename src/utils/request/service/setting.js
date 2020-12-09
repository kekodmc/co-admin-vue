import get from '../get'
import post from '../post'
import put from '../put'

export default {
    getNotice:_=>get('api/setting/notice'),
    setNotice:data=>post('api/setting/notice',data),
}
