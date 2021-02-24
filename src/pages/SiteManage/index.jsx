import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import SiteList from './components/SiteList';

@connect()
class SiteManage extends Component {
    render(){
        return(
            <PageContainer>
                <Row>
                    <Col span={11}>
                        <SiteList />
                    </Col>
                    <Col span={13}>
                        right
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default SiteManage;