import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Table, message, Form, Row, Col, Input, Button, Select, Space } from 'antd';
import styles from '../index.less';

const FormItem = Form.Item;
const { Option } = Select;


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};


const columns = [
    {
      title: '模版名称',
      dataIndex: 'templateName',
    },
    {
      title: '模版分组',
      dataIndex: 'templateGroupName',
    },
    {
        title: '状态',
        dataIndex: 'state',
        render: (text) => {
            if(text == 1){
                return '启用'
            }
            return '停用'
        }
    }
];

const siteTemplateIdModal = (props) => {
    const [form] = Form.useForm();
    const { templateGroupList, templateList, onCancle, onTemplateIdSure } = props;
    const [row, setRow] = useState({});

    // 组件加载完毕
    useEffect(() => {
        const { dispatch } = props;
        dispatch({
            type: 'siteManage/AllTemplateGroup'
        });
        dispatch({
            type: 'siteManage/getTemplateList',
            payload: {
                groupId: '',
                templateName: '',
                templateType: 10,
                pageNumber: 1,
                pageSize: 20
            }
        });
    }, [])

    // 确定事件
    const handleOk = () => {
        if(Object.keys(row).length == 0){
            message.success('请选择一个模版');
            return;
        }
        onTemplateIdSure(row);
        onCancle();
    }

    // 关闭事件
    const handleCancel = () => {
        onCancle()
    }

    // table点击行改变背景
    const setRowClassName = (record) => {
        return record.id == row.id ? 'clickRowStyl' : '';
    }

    // 搜索事件
    const onFinish = (values) => {
        const { dispatch } = props;
        const imParam = {
            groupId: values.groupId,
            templateName: values.templateName,
            templateType: 10,
            pageNumber: 1,
            pageSize: 20
        }
        dispatch({
            type: 'siteManage/getTemplateList',
            payload: imParam
        });
        setRow({})
    }

    const renderForm = () => {
        return (
            <div className={styles.searchStyleCol1}>
                <Form
                    form={form}
                    {...layout}
                    initialValues={{
                        groupId: '',
                        templateName: ''
                    }}
                    onFinish={onFinish}
                    >
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label="模版分组"
                                name="groupId"
                            >
                                <Select>
                                    {templateGroupList.map(item => {
                                        return <Option key={item.id} value={item.id}>{item.groupAlias}</Option>
                                    })}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="模版名称"
                                name="templateName"
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={7} offset={1}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                                <Button htmlType="button" onClick={() => {form.resetFields()}}>
                                    重置
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

    return(
        <Modal
            title="模版信息"
            width={window.innerWidth * 0.6}
            visible={true}
            onOk={handleOk}
            onCancel={handleCancel}
        >
        <div>
            {renderForm()}
            <Table
                rowKey="id"
                size="small"
                onRow={record => {
                    return {
                        onClick: event => {
                            setRow(record)
                        }, // 点击行
                    };
                }}
                rowClassName={setRowClassName}
                pagination={false}
                bordered={true}
                columns={columns}
                dataSource={templateList}
            />
        </div>
      </Modal>
    )
}

export default connect(({ siteManage }) => ({
    templateGroupList: siteManage.templateGroupList,
    templateList: siteManage.templateList
}))(siteTemplateIdModal);