import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Tabs } from 'antd';
import styles from '../index.less';

const { TabPane } = Tabs;
const SiteDetail = (props) => {
    
    const callback = (key) => {
        console.log(key);
    }

    return(
        <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default connect(({ siteManage }) => ({
    siteTreeList: siteManage.siteTreeList
}))(SiteDetail);