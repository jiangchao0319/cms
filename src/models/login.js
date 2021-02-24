import { stringify } from 'querystring';
import { history } from 'umi';
import { login, isLogin, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    currentUser: {},
    status: undefined,
  },
  effects: {
    // 查询用户是否登录
    *isLogin({ }, { call, put }) {
      const response = yield call(isLogin);
      localStorage.setItem('currentUser', JSON.stringify(response));
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      // 已经登录
      if(response._csrf){
        // 跳转进系统
        history.replace('/sitemanage' || '/');
      }
    },

    // 登录
    *login({ payload }, { call, put }) {
      const { isSuccess } = yield call(login, payload);
      // 登录成功
      if(isSuccess == 1){
        history.replace('/sitemanage');
      }
    },


    // *login({ payload }, { call, put }) {
    //   const response = yield call(fakeAccountLogin, payload);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   }); // Login successfully

    //   if (response.status === 'ok') {
    //     const urlParams = new URL(window.location.href);
    //     const params = getPageQuery();
    //     console.log(params)
    //     message.success('🎉 🎉 🎉  登录成功！');
    //     let { redirect } = params;

    //     if (redirect) {
    //       const redirectUrlParams = new URL(redirect);

    //       if (redirectUrlParams.origin === urlParams.origin) {
    //         redirect = redirect.substr(urlParams.origin.length);

    //         if (redirect.match(/^\/.*#/)) {
    //           redirect = redirect.substr(redirect.indexOf('#') + 1);
    //         }
    //       } else {
    //         window.location.href = '/';
    //         return;
    //       }
    //     }

    //     history.replace(redirect || '/');
    //   }
    // },

    // 退出
    *logout({}, {call, put}) {
      const response = yield call(logout);

      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    // 保存当前用户
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
