import request from '@/utils/request';
import { stringify } from 'qs';

// 查询用户是否登录
export async function isLogin() {
  return request('/cmsAdmin/logged');
}

// 登录接口
export async function login(params) {
  return request('/cmsAdmin/login', {
    method: 'POST',
    body: stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 退出账号
export async function logout() {
  return request('/cmsAdmin/logout');
}
