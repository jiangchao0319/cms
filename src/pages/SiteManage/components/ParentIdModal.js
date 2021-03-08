import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Table, message } from 'antd';

const columns = [
    {
      title: '网站名称',
      dataIndex: 'siteName',
    },
    {
      title: '所属',
      dataIndex: '',
    }
];

const ParentIdModal = (props) => {
    const { siteTreeList, onCancle, onParentIdSure } = props;
    const [row, setRow] = useState({});

    // 组件加载完毕
    useEffect(() => {
        
    }, [])

    // 确定事件
    const handleOk = () => {
        if(Object.keys(row).length == 0){
            message.success('请选择一个站点');
            return;
        }
        onParentIdSure(row);
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

    return(
        <Modal
            title="站点信息"
            width={window.innerWidth * 0.6}
            visible={true}
            onOk={handleOk}
            onCancel={handleCancel}
        >
        <div>
            <Table
                rowKey="id"
                size="small"
                onRow={record => {
                    return {
                        onClick: event => {
                            setRow(record)
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
      </Modal>
    )
}

export default connect(({ siteManage }) => ({
    siteTreeList: siteManage.siteTreeList
}))(ParentIdModal);