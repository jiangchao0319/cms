import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import SiteList from './components/SiteList';
import SiteDetail from './components/SiteDetail';

@connect()
class SiteManage extends Component {
    render(){
        return(
            <PageContainer>
                <Row>
                    <Col span={11}>
                        <SiteList />
                    </Col>
                    <Col span={12} offset={1}>
                        <SiteDetail />
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default SiteManage;