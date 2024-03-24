import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";
import { useEffect, useState } from "react";
import DefaultTable from "../../../components/defaultTable/Table";
import Auxiliary from "util/Auxiliary";
import { useHistory } from "react-router-dom";
import ConfirmModel from "../../../components/ConfirmModel";
import Images3DService from "../../../service/Images3DService";

function Map() {

    const [data, setData] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [visiblemodel, setVisiblemodel] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [visible_confirm_model, setVisible_confirm_model] = useState(false)
    const [actionData, setActionData] = useState({
        message: '',
        action: ''
    })
    const history = useHistory()
    const title = 'Upload 3D Images'

    const sorter = (v1, v2) => {
        return (v1 === null) - (v2 === null) || (isFinite(v1) && isFinite(v2) ? v1 - v2 : v1.toString().localeCompare(v2))
    }

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', render: text => text.charAt(0).toUpperCase() + text.slice(1), sorter: (a, b) => sorter(a.name, b.name) },
        { title: 'Wallpaper', dataIndex: 'url', key: 'url', render: theImageURL => <video onMouseOver={(e) => { e.target.play() }} width="150" height="150" muted onMouseOut={(e) => { e.target.pause() }}><source src={theImageURL} /></video> },
        { title: 'Type', dataIndex: 'type', key: 'type', render: text => text.name.charAt(0).toUpperCase() + text.name.slice(1), sorter: (a, b) => sorter(a.type.name, b.type.name) },
        { title: 'Active', dataIndex: 'is_active', key: 'is_active', render: text => text ? 'True' : 'False', sorter: (a, b) => sorter(a.is_active, b.is_active) },
        { title: 'Modified by', dataIndex: 'modified_by', key: 'modified_by', render: text => text, sorter: (a, b) => sorter(a.modified_by, b.modified_by) },
        { title: 'UpdatedAt', dataIndex: 'updatedAt', key: 'updatedAt', render: text => new Date(text).toLocaleString('en-GB'), sorter: (a, b) => sorter(a.updatedAt, b.updatedAt) },
    ]

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoadingData(true)
        await Images3DService.GetAll3DWallpaper({})
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
    }

    const tableData = {
        title: title,
        columns: columns,
        addNewDataUrl: `Upload3DImages/add3D`,
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
                message: 'Do you want to Delete selected 3Dimages', action: e => handleDelete(selectedRowKeys, selectedRows)
            })
        } else if (type === 'edit') {
            history.push({
                pathname: 'Upload3DImages/edit3D',
                state: {
                    editData: selectedRows[0],
                    id: selectedRowKeys
                }
            })
        }
    }

    const handleDelete = async (key, row) => {
        setLoadingData(true)
        await Images3DService.Delete3D(selectedRowKeys[0])
            .then((result) => {
                console.log(result)
                setLoadingData(false)
                fetchData()
            })
            .catch((err) => {
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
        <div>
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
        </div>
    )
}
export default Map;