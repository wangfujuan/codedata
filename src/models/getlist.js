// import { parse, stringify } from 'qs';
// import { routerRedux } from 'dva/router';
import { queryTest } from '@/services/user';
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
        const response = yield call(queryTest, payload);
        yield put({
            type: 'save',
            payload: response
        })
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
export default GetListModal;