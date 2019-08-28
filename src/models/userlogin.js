import { message } from 'antd';
import { userLogin } from '@/services/user';
import router from 'umi/router';

const PostUserLogin = {
  namespace: 'userlogin',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(userLogin, payload);
        if(response && response.code === 200){
            console.log('成功')
            message.success(response.msg); 
            router.push({
                pathname: '/web'
            });  
        }else{
            message.error(response.msg)
        }
        
    }
  },
  reducers: {
    save( state, action ) {
        return {
            ...state,
            data: action.payload
        }
    }
  },
};
export default PostUserLogin;