import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Tabs } from 'antd';
import SiteDetailContent from './SiteDetailContent';
import styles from '../index.less';

const { TabPane } = Tabs;
const SiteDetail = (props) => {
    const { siteId, siteDetail } = props;
    // 组件加载完毕
    useEffect(() => {
        const { dispatch } = props;
        dispatch({
          type: 'siteManage/getSiteDetail',
          payload: {
            id: siteId,
          }
        });
        dispatch({
            type: 'siteManage/getSiteColumn',
            payload: {
                siteId: siteId,
            }
        });
    }, [siteId])

    // tabs 点击事件
    const callback = (key) => {
        // console.log(key);
    }

    return(
        <div className={styles.siteDetailContent}>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="网站详情" key="1">
                    <SiteDetailContent siteDetail={siteDetail} />
                </TabPane>
                <TabPane tab="网站栏目" key="2">
                Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}

export default connect(({ siteManage }) => ({
    siteDetail: siteManage.siteDetail
}))(SiteDetail);