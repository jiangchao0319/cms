import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Table, Tag, Space, Button, Form, Input, Checkbox, Popconfirm } from 'antd';
import {
    StopOutlined,
    DownloadOutlined,
    EyeOutlined,
    KeyOutlined,
} from '@ant-design/icons';
import styles from '../index.less';

const FormItem = Form.Item;

const SiteList = (props) => {
    const { siteTreeList, siteTableClick } = props;
    const [rowId, setRowId] = useState('');

    // 禁用接口
    const disableConfirm = (record, siteState) => {
        const { dispatch } = props;
        dispatch({
          type: 'siteManage/ableSite',
          payload: {
            id: record.id,
            siteState,
            siteType: 0,
          }
        });
    }

    // table点击行改变背景
    const setRowClassName = (record) => {
        return record.id == rowId ? 'clickRowStyl' : '';
    }

    const downloadSite = (record) => {
        window.open(`http://10.45.67.177:18080/cms-admin/cms/site/downloadSite?id=${record.id}`)
    }

    const columns = [
        {
          title: '网站名称',
          dataIndex: 'siteName',
        },
        {
          title: '所属',
          dataIndex: '',
        },
        {
          title: '状态',
          dataIndex: 'siteState',
          render: (value) => {
              if(value == 1){
                return <Tag color={'green'} key={value}>
                    启用
                </Tag>
              }else if(value == 0){
                return <Tag color={'red'} key={value}>
                        禁用
                    </Tag>
              }
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          render: (text, record) => (
            <Space size="middle">
                {record.siteState == '1' ?
                    <>
                        <Popconfirm
                            title="是否要禁用该站点？"
                            onConfirm={() => disableConfirm(record, 0)}
                            okText="是"
                            cancelText="否"
                        >
                            <StopOutlined />
                        </Popconfirm>
                        <DownloadOutlined onClick={() => downloadSite(record)} />
                        <EyeOutlined />
                    </>
                    :
                    <Popconfirm
                        title="是否要启用该站点？"
                        onConfirm={() => disableConfirm(record, 1)}
                        okText="是"
                        cancelText="否"
                    >
                        <KeyOutlined />
                    </Popconfirm>}
            </Space>
          ),
        },
    ];

    // 组件加载完毕
    useEffect(() => {
        const { dispatch } = props;
        dispatch({
          type: 'siteManage/listSiteTreeIsShowAll',
          payload: {
            siteName: '',
            isAllShow: false,
          },
          callback: (data) => {
            if(data.length > 0){
                setRowId(data[0].id)
                siteTableClick(data[0].id)
            }
          }
        });
    }, [])

    const onFinish = (values) => {
        const { dispatch } = props;
        dispatch({
          type: 'siteManage/listSiteTreeIsShowAll',
          payload: {
            siteName: values.siteName,
            isAllShow: values.isAllShow,
          },
          callback: () => {

          }
        });
    };

    const renderForm = () => {
        return (
            <div className={styles.searchStyle}>
                <Form
                    initialValues={{
                        siteName: '',
                        isAllShow: false,
                    }}
                    onFinish={onFinish}
                    >
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label="网站名称"
                                name="siteName"
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={11} offset={1}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label="显示禁用"
                                name="isAllShow"
                                valuePropName="checked"
                            >
                                <Checkbox />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
    return(
        <div>
            {renderForm()}
            <div className={styles.siteContent}>
                <Table
                    rowKey="id"
                    size="small"
                    onRow={record => {
                        return {
                            onClick: event => {
                                setRowId(record.id)
                                siteTableClick(record.id)
                            }, // 点击行
                            onDoubleClick: event => {},
                            onContextMenu: event => {},
                            onMouseEnter: event => {}, // 鼠标移入行
                            onMouseLeave: event => {},
                        };
                    }}
                    rowClassName={setRowClassName}
                    pagination={false}
                    bordered={true}
                    columns={columns}
                    dataSource={siteTreeList}
                />
            </div>
        </div>
    )
}

export default connect(({ siteManage }) => ({
    siteTreeList: siteManage.siteTreeList
}))(SiteList);