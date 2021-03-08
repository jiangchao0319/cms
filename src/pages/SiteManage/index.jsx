import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import SiteList from './components/SiteList';
import SiteDetail from './components/SiteDetail';

class SiteManage extends Component {
    constructor(props){
        super(props);
        this.state={
            siteId: ''
        }
    }
    // 点击站点信息回传
    siteTableClick = (siteId) => {
        this.setState({
            siteId,
        })
    }
    render(){
        const { siteId } = this.state;
        return(
            <PageContainer
                header={{
                    breadcrumb: false,
                    title: '站点管理',
                }}
            >
                <Row>
                    <Col span={10}>
                        <SiteList siteTableClick={this.siteTableClick} />
                    </Col>
                    <Col span={13} style={{ marginLeft: '10px' }}>
                        <SiteDetail siteId={siteId}/>
                    </Col>
                </Row>
            </PageContainer>
        )
    }
}

export default SiteManage;