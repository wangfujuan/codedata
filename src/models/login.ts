import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { userLogin, getFakeCaptcha } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === 200) {
        const urlParams = new URL(window.location.href); //常量
        const params = getPageQuery();
        let { redirect } = params as { redirect: string }; //变量
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      localStorage.clear();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('user');
      localStorage.setItem('userid', payload.list.id);
      localStorage.setItem('nickName', payload.list.nickname);
      return {
        ...state,
        status: 'ok',
        type: 'account',
      };
    },
  },
};

export default Model;
