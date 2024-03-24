import { Menu, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { withRouter, useHistory } from 'react-router-dom';
import { ConfirmModel } from '../../../components/ConfirmModel';
import AllWallpaperTypeService from "../../../service/AllWallpaperTypeService";
import DefaultTable from "../../../components/defaultTable/Table";
import Auxiliary from "util/Auxiliary";
const title = 'wallpaper Types';

const MainActivities = () => {
    const [data, setData] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [visible_confirm_model, setVisible_confirm_model] = useState(false)
    const [visiblemodel, setVisiblemodel] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [actionData, setActionData] = useState({
        message: '',
        action: ''
    })
    const history = useHistory()

    const sorter = (v1, v2) => {
        return (v1 === null) - (v2 === null) || (isFinite(v1) && isFinite(v2) ? v1 - v2 : v1.toString().localeCompare(v2))
    }
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', render: text => text.charAt(0).toUpperCase() + text.slice(1), sorter: (a, b) => sorter(a.name, b.name) },
        { title: 'Active', dataIndex: 'is_active', key: 'is_active', render: text => text ? 'True' : 'False', sorter: (a, b) => sorter(a.is_active, b.is_active) },
        // { title: 'Modified by', dataIndex: 'modified_by', key: 'modified_by', render: text => text, sorter: (a, b) => sorter(a.modified_by, b.modified_by) },
        { title: 'UpdatedAt', dataIndex: 'updatedAt', key: 'updatedAt', render: text => new Date(text).toLocaleString('en-GB'), sorter: (a, b) => sorter(a.updatedAt, b.updatedAt) },
    ]

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoadingData(true)
        await AllWallpaperTypeService.GetAllWallpaperType({})
            .then((response) => {
                setData(response.data)
                setLoadingData(false)
            })
            .catch((err) => {
                console.log(err)
                setLoadingData(false)
                message.error(err.message)
            })
    }

    const onSelectionChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
    };

    const handleRefresh = async () => {
        await fetchData();
    };

    const tableData = {
        title: title,
        columns: columns,
        addNewDataUrl: `wallpaperType/addwallpaperType`,
        button: 'ADD',
        search: true,
        handleRefresh: handleRefresh,
        onSelectionChange: onSelectionChange
    }

    const onActionChange = value => {
        showConfirm(value.key);
    };

    const showConfirm = type => {
        if (type === 'delete') {
            setVisiblemodel(true)
            setVisible_confirm_model(true)
            setActionData({
                message: 'Do you want to Delete selected WallpaperTypes?', action: e => handleDelete(selectedRowKeys, selectedRows)
            })
        } else if (type === 'edit') {
            history.push({
                pathname: 'wallpaperType/editwallpaperType',
                state: {
                    editData: selectedRows[0],
                    id: selectedRowKeys
                }
            })
        }
    }

    const handleDelete = async (key, row) => {
        setLoadingData(true)
        await AllWallpaperTypeService.DeleteWallpaper(selectedRowKeys[0])
            .then((result) => {
                console.log(result)
                setLoadingData(false)
                fetchData()
            })
            .catch((err) => {
                console.log(err)
                setLoadingData(false)
                message.error(err.message)
            })
    };

    const visibleModel = () => {
        setVisiblemodel(!visiblemodel)
    }

    const menu = (
        <Menu onClick={onActionChange}>
            <Menu.Item key="edit">
                <EditOutlined />
                Edit
            </Menu.Item>
            <Menu.Item key="delete">
                <DeleteOutlined />
                Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Auxiliary>
                <DefaultTable
                    menu={menu}
                    dataSource={data}
                    data={tableData}
                    loadingData={loadingData}
                    pagination={true}
                    selectedRowKeys={selectedRowKeys}
                    selectedRows={selectedRows}
                />
                {visible_confirm_model ? <ConfirmModel actionData={actionData} visibleModel={visiblemodel} visible={visibleModel} /> : null}
            </Auxiliary>
        </>
    );
}

export default withRouter(MainActivities);

