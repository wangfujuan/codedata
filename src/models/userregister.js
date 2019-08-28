import { message } from 'antd';
import { userRegister } from '@/services/user';
import router from 'umi/router';

const PostUserRegister = {
  namespace: 'userregister',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(userRegister, payload);
        if(response && response.code === 200){
            message.success(response.msg); 
            router.push({
                pathname: '/user/login'
            });
            // setTimeout(()=>{
            //     router.push({
            //         pathname: '/user/login'
            //     });
            // }, 2000) 
            
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
export default PostUserRegister;