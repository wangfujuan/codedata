// import { parse, stringify } from 'qs';
// import { routerRedux } from 'dva/router';
import { getArticleList } from '@/services/article';
// export function getPageQuery() {
//   return parse(window.location.href.split('?')[1]);
// }
const GetListModal = {
  namespace: 'getlist',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getArticleList, payload);
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
export default GetListModal;
