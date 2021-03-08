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

// 根据siteId查询网站详情
export async function getSiteDetail(params) {
  return request('/cmsAdmin/cms/site/get', {
    method: 'POST',
    body: stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 根据siteId查询网站栏目
export async function getSiteColumn(params) {
  return request('/cmsAdmin/cms/site/listSiteColumn', {
    method: 'POST',
    body: stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 查询网站模版-模版分组
export async function AllTemplateGroup(params) {
  return request('/cmsAdmin/cms/template/AllTemplateGroup', {
    method: 'POST',
    body: stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 根据模版分组、模版名称查询模版列表
export async function getTemplateList(params) {
  return request('/cmsAdmin/cms/template/list', {
    method: 'POST',
    body: stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 附件上传
export async function upload(params) {
  return request('/cmsAdmin/cms/site/fileUpload/upload', {
    method: 'POST',
    body: stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
