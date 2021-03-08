import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Form, Input, Button, Select, Radio, Upload, Space } from 'antd';
import ParentIdModal from './ParentIdModal';
import SiteTemplateIdModal from './SiteTemplateIdModal';

const FormItem = Form.Item;
const { Search } = Input;
const { TextArea } = Input;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const SiteDetailContent = (props) => {
    const { siteDetail } = props;
    const [form] = Form.useForm();
    // 上级网站
    const [ parentIdVisible, setParentIdVisible ] = useState(false);
    const [ parentIdObj, setParentIdObj] = useState({});
    // 网站模版
    const [ siteTemplateVisible, setSiteTemplateVisible ] = useState(false);
    const [ siteTemplateObj, setsiteTemplateObj] = useState({});
    // TOP图片
    const [ imgList, setImgList ] = useState([]);
    // form表单disabled
    const [ formDisabled, setFormDisabled ] = useState(true);
    const [ addAndEdit, setAddAndEdit ] = useState('');
    
    // 组件加载完毕
    useEffect(() => {
        // 还原详情状态
        setAddAndEdit('')
        setFormDisabled(true)
        // 上级网站数据
        setParentIdObj({
            parentId: siteDetail.parentId,
            parentName: siteDetail.parentName,
        })
        // 表单赋值
        form.setFieldsValue({
            siteName: siteDetail.siteName,
            siteAlias: siteDetail.siteAlias,
            parentIdName: siteDetail.parentName,
            keywords: siteDetail.keywords,
            siteTemplateIdName: siteDetail.templateName,
            siteState: siteDetail.siteState,
            recommend: siteDetail.recommend,
            hostUnit: siteDetail.hostUnit,
            phone: siteDetail.phone,
            mail: siteDetail.mail,
            copyright: siteDetail.copyright,
            siteIntro: siteDetail.siteIntro,
            other: siteDetail.other,
        });
    }, [siteDetail])

    // 提交事件
    const onFinish = (values) => {
        console.log(values)
        const inParam = {
            ...values,
            parentId: parentIdObj.parentId,
            siteTemplateId: siteTemplateObj.siteTemplateId,
            siteTemplateGroup: siteTemplateObj.siteTemplateGroup,
        };
        delete inParam.parentIdName;
        delete inParam.siteTemplateIdName;
        console.log('inParam:', inParam)
        const { dispatch } = props;
        dispatch({
          type: 'siteManage/siteAdd',
          payload: inParam,
        });
    }

    // 上级网站选择事件
    const onParentIdSearch = () => {
        setParentIdVisible(true);
    }

    // 上级网站确定事件
    const onParentIdSure = (row) => {
        setParentIdObj({
            parentId: row.id,
            parentName: row.siteName,
        })
        // 表单赋值
        form.setFieldsValue({
            parentIdName: row.siteName,
        });
    }

    // 网站模版选择事件
    const onSiteTemplateIdSearch = () => {
        setSiteTemplateVisible(true)
    }

    // 网站模版确定事件
    const onTemplateIdSure = (row) => {
        setsiteTemplateObj({
            siteTemplateId: row.id,
            siteTemplateGroup: row.templateGroupId,
            siteTemplateIdName: row.templateName,
        })
        // 表单赋值
        form.setFieldsValue({
            siteTemplateIdName: row.templateName,
        });
    }

    // 关闭弹出框
    const onCancle = (type) => {
        if(type == 'parentIdModal'){
            setParentIdVisible(false);
        }
        if(type == 'siteTemplateIdModal'){
            setSiteTemplateVisible(false)
        }
    }

    // 图片上传
    const doImgUpload = (options) => {
        const { onSuccess, onError, file, onProgress } = options;

        // start：进度条相关
        // 伪装成 handleChange里面的图片上传状态
        const imgItem = {
        uid: '1', // 注意，这个uid一定不能少，否则上传失败
        name: 'hehe.png',
        status: 'uploading',
        url: '',
        percent: 99, // 注意不要写100。100表示上传完成
        };

        // 更新 imgList
        setImgList([imgItem])
        // end：进度条相关

        const reader = new FileReader();
        reader.readAsDataURL(file); // 读取图片文件

        reader.onload = (file) => {
            const { dispatch } = props;
            const params = {
                files: file.target.result, // 把 本地图片的base64编码传给后台，调接口，生成图片的url
            };
            console.log(file)
            dispatch({
                type: 'siteManage/upload',
                payload: params
            });
        };
    };

    // 新建、编辑、取消事件
    const addAndEditClick = (type) => {
        if(type == 'add'){
            // 表单清空
            form.setFieldsValue({
                siteName: '',
                siteAlias: '',
                parentIdName: '',
                keywords: '',
                siteTemplateIdName: '',
                siteState: '',
                recommend: '',
                hostUnit: '',
                phone: '',
                mail: '',
                copyright: '',
                siteIntro: '',
                other: '',
            });
            // 表单允许编辑
            setFormDisabled(false)
            // 修改add还是edit变量
            setAddAndEdit(type)
        }
        if(type == 'edit'){
            setFormDisabled(false)
            setAddAndEdit(type)
        }
        if(type == 'cancle'){
            // 如果是从新建点击修改，数据刷回去
            if(addAndEdit == 'add'){
                form.setFieldsValue({
                    siteName: siteDetail.siteName,
                    siteAlias: siteDetail.siteAlias,
                    parentIdName: siteDetail.parentName,
                    keywords: siteDetail.keywords,
                    siteTemplateIdName: siteDetail.templateName,
                    siteState: siteDetail.siteState,
                    recommend: siteDetail.recommend,
                    hostUnit: siteDetail.hostUnit,
                    phone: siteDetail.phone,
                    mail: siteDetail.mail,
                    copyright: siteDetail.copyright,
                    siteIntro: siteDetail.siteIntro,
                    other: siteDetail.other,
                });
            }
            setFormDisabled(true)
            setAddAndEdit('')
        }
    }
    return(
        <div>
            <Form
                form={form}
                {...layout}
                // initialValues={{ // 初始化
                //     siteName: siteDetail.siteName,
                //     siteAlias: siteDetail.siteAlias,
                //     parentIdName: parentIdObj.parentName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                //     siteName: siteDetail.siteName,
                // }}
                onFinish={onFinish}
                >
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="网站名称"
                            name="siteName"
                            rules={[{ 
                                required: true, 
                                message: '' 
                            }]}
                        >
                            <Input disabled={formDisabled} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="网站别名"
                            name="siteAlias"
                            rules={[{ 
                                required: true, 
                                message: '' 
                            }]}
                        >
                            <Input disabled={formDisabled} />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="上级网站"
                            name="parentIdName"
                        >
                            <Search
                                disabled={formDisabled}
                                onSearch={onParentIdSearch}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="关键词"
                            name="keywords"
                        >
                            <Input disabled={formDisabled} />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="网站模版"
                            name="siteTemplateIdName"
                            rules={[{ 
                                required: true, 
                                message: '' 
                            }]}
                        >
                            <Search
                                disabled={formDisabled}
                                onSearch={onSiteTemplateIdSearch}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="网站状态"
                            name="siteState"
                            rules={[{
                                required: true,
                                message: ''
                            }]}
                        >
                            <Select disabled={formDisabled}>
                                <Option key={1} value={1}>启用</Option>
                                <Option key={0} value={0}>停用</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="允许推荐"
                            name="recommend"
                        >
                            <Radio.Group disabled={formDisabled}>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </Radio.Group>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="主办单位"
                            name="hostUnit"
                        >
                            <Input disabled={formDisabled} />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="联系方式"
                            name="phone"
                        >
                            <Input disabled={formDisabled} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="邮箱"
                            name="mail"
                        >
                            <Input disabled={formDisabled} />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="版权信息"
                            name="copyright"
                        >
                            <Input disabled={formDisabled} />
                        </FormItem>
                    </Col>
                </Row>
                {/* <Row>
                    <Col span={12}>
                        <Upload
                            action="2"
                            customRequest={doImgUpload}
                            listType="picture"
                            fileList={imgList}
                        >
                            <Button>上传TOP图片</Button>
                        </Upload>
                    </Col>
                </Row> */}
                <Row style={{ height: '63px' }}>
                    <Col span={24}>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            label="网站说明"
                            name="siteIntro"
                        >
                            <TextArea disabled={formDisabled} />
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{ height: '63px' }}>
                    <Col span={24}>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            label="其他说明"
                            name="other"
                        >
                            <TextArea disabled={formDisabled} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Space>
                            {addAndEdit == ''&&
                            <>
                                <Button type="primary" onClick={() => addAndEditClick('add')}>
                                    新建
                                </Button>
                                <Button type="button" onClick={() => addAndEditClick('edit')}>
                                    编辑
                                </Button>
                            </>
                            }
                            {(addAndEdit == 'add' || addAndEdit == 'edit')&&
                            <>
                                <Button type="primary" htmlType="submit">
                                    确认
                                </Button>
                                <Button type="button" onClick={() => addAndEditClick('cancle')}>
                                    取消
                                </Button>
                            </>
                            }
                        </Space>
                    </Col>
                </Row>
            </Form>
            {parentIdVisible&&
                <ParentIdModal
                    onParentIdSure={onParentIdSure}
                    onCancle={() => onCancle('parentIdModal')}
                />
            }
            {siteTemplateVisible&&
                <SiteTemplateIdModal
                    onTemplateIdSure={onTemplateIdSure}
                    onCancle={() => onCancle('siteTemplateIdModal')}
                />
            }
        </div>
    )
}

export default connect()(SiteDetailContent);