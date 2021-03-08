import { stringify } from 'querystring';
import { message } from 'antd';
import { listToTree } from '@/utils/tools';
import {
  listSiteTreeIsShowAll,
  ableSite,
  getSiteDetail,
  getSiteColumn,
  AllTemplateGroup,
  getTemplateList,
  upload,
 } from '../services/service';

const Model = {
  namespace: 'siteManage',
  state: {
    siteTreeList: [],
    siteDetail: {},
    siteColumnList: [],
    templateGroupList: [],
  },
  effects: {
    // 查询站点列表
    *listSiteTreeIsShowAll({ payload, callback }, { call, put }) {
      const { code, datas } = yield call(listSiteTreeIsShowAll, payload);
      if(code == 1){
        yield put({
            type: 'save',
            payload: {
                siteTreeList: listToTree(datas, 'id', 'parentId', null)
            },
        });
        callback(datas);
      }
    },
    // 禁用站点
    *ableSite({ payload }, { call, put }) {
        const { siteState } = payload;
        const { code, datas } = yield call(ableSite, payload);
        if(code == 1){
            if(siteState == 0){
                message.success('站点禁用成功!')
            }else if(siteState == 1){
                message.success('站点启用成功!')
            }
            // 调用站点查询接口
            yield put({
                type: 'listSiteTreeIsShowAll',
                payload: {},
                callback: () => {}
            })
        }
    },
    // 根据siteId查询网站详情
    *getSiteDetail({ payload }, { call, put }){
      const { code, datas } = yield call(getSiteDetail, payload);
      if(code == 1){
        yield put({
            type: 'save',
            payload: {
              siteDetail: datas
            },
        });
      }
    },
    // 根据siteId查询网站栏目
    *getSiteColumn({ payload }, { call, put }){
      const { code, datas } = yield call(getSiteColumn, payload);
      if(code == 1){
        yield put({
            type: 'save',
            payload: {
              siteColumnList: datas
            },
        });
      }
    },
    // 查询网站模版-模版分组
    *AllTemplateGroup({ }, { call, put }){
      const { code, datas } = yield call(AllTemplateGroup);
      if(code == 1){
        yield put({
            type: 'save',
            payload: {
              templateGroupList: datas
            },
        });
      }
    },
    // 根据模版分组、模版名称查询模版列表
    *getTemplateList({ payload }, { call, put }){
      const { code, datas } = yield call(getTemplateList, payload);
      if(code == 1){
        yield put({
            type: 'save',
            payload: {
              templateList: datas
            },
        });
      }
    },
    // 附件上传
    *upload({ payload }, { call, put }){
      const { code, datas } = yield call(upload, payload);
      // if(code == 1){
      //   yield put({
      //       type: 'save',
      //       payload: {
      //         templateList: datas
      //       },
      //   });
      // }
    },
    // 新增详情
    *siteAdd({ payload }, { call, put }){
      const { code, datas } = yield call(siteAdd, payload);
      if(code == 1){
        yield put({
            type: 'save',
            payload: {
              templateList: datas
            },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
    },
  },
};
export default Model;
