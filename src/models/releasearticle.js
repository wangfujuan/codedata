import { message } from 'antd';
import { releaseArticle } from '@/services/article';
import router from 'umi/router';

const PostAddArticle = {
  namespace: 'releasearticle',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(releaseArticle, payload);
      // if(response && response.code === 200){
      //     console.log('成功')
      //     message.success(response.msg);
      //     router.push({
      //         pathname: '/web'
      //     });
      // }else{
      //     message.error(response.msg)
      // }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
export default PostAddArticle;
