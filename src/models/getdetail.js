// import { parse, stringify } from 'qs';
// import { routerRedux } from 'dva/router';
import { showArticle } from '@/services/article';
// export function getPageQuery() {
//   return parse(window.location.href.split('?')[1]);
// }
const GetDetailModal = {
  namespace: 'getdetail',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(showArticle, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
export default GetDetailModal;
