import request from '@/utils/request';

// 查询用户是否登录
export async function isLogin() {
  return request('/cms/logged');
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
