import request from '@/utils/request';
import { stringify } from 'qs';

// 查询站点列表
export async function listSiteTreeIsShowAll(params) {
  return request('/cmsAdmin/cms/site/listSiteTreeIsShowAll', {
    method: 'POST',
    body: stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 禁用站点
export async function ableSite(params) {
    return request('/cmsAdmin/cms/site/ableSite', {
      method: 'POST',
      body: stringify(params),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    });
  }
