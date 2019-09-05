// import { message } from 'antd';
import { uploadFile } from '@/services/upload';
// import router from 'umi/router';

const PostUploadFile = {
  namespace: 'uploadfile',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(uploadFile, payload);
      if (callback) callback(response);
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
export default PostUploadFile;
