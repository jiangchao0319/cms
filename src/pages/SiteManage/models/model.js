import { stringify } from 'querystring';
import { message } from 'antd';
import { listSiteTreeIsShowAll, ableSite } from '../services/service';

const Model = {
  namespace: 'siteManage',
  state: {
    siteTreeList: [],
  },
  effects: {
    // 查询站点列表
    *listSiteTreeIsShowAll({ payload, callback }, { call, put }) {
      const { code, datas } = yield call(listSiteTreeIsShowAll, payload);
      if(code == 1){
        yield put({
            type: 'save',
            payload: {
                siteTreeList: datas
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
                payload: {}
            })
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
