import React from "react";
import { Button, Card, Table, Form, Input, Dropdown, Modal, } from "antd";
// import Form from "antd/lib/form/Form";
import { CaretDownOutlined, PlusOutlined, ReloadOutlined, DeleteOutlined, SendOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import UserDropdown from "../InputControl/UserDropdown/UserDropdown";
import { Link } from "react-router-dom";
import InputText from "../InputControl/InputText/InputText";
import InputSelect from "../InputControl/InputSelect/InputSelect";
import InputTextArea from "../InputControl/InputText/TextAreas";
// import CityService from "../../service/CityService";
const { Search } = Input;
const form = React.createRef();
const FormItem = Form.Item;
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 16,
    },
};

class DefaultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            selectedRowKeys: [],
            selectedRows: '',
            isModalVisible: false,
            previewVisible: false
        };
    }

    handleCancel = () => this.setState({ previewVisible: false })

    onSearchStringChange = event => {
        if (event.target.value === '') {
            this.setState({ searchText: null, filterData: null })
            return;
        }
        const value = event.target.value.toLowerCase();
        const newData = this.filteredData(this.props.dataSource, value);
        this.setState({ searchText: event.target.value, filterData: newData })

    };

    filteredData = (data, value) => data.filter(elem => (
        Object.keys(elem).some(key => elem[key] != null ? elem[key].toString().toLowerCase().includes(value) : "")
    ));


    onSearch = value => {
        if (value === '') {
            this.setState({ filterData: null })
            return;
        }
        const newData = this.filteredData(this.props.dataSource, value);
        this.setState({ searchText: value, filterData: newData })
        if (this.props.data.SearchData) {
            this.props.data.SearchData(value)
        }
    };

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
        if (this.props.data.ShowMore) {
            let count = Math.ceil(this.props.dataSource.length / pagination.pageSize)
            if (count === pagination.current) {
                this.props.data.ShowMore()
            }
        }
    };

    onSelectionChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
        this.props.data.onSelectionChange(selectedRowKeys, selectedRows)
    };

    ShowActivity = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
        this.props.data.ShowActivity(selectedRowKeys, selectedRows)
    }

    onUserSelect = (e) => {
        this.props.data.onUserSelect(e)
    }


    dateFormate = (date) => {
        var t = new Date(date * 1000);
        date = ("0" + t.getDate()).slice(-2) + '/' + ("0" + (t.getMonth() + 1)).slice(-2) + '/' + (t.getFullYear());
        return date
    }

    currancyFormate = (data) => {
        data = data / 100
        data = parseInt(data).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        return data
    }


    expandedRowData = (data) => {

        return (
            <Form
                {...layout}
                name="basic"
            >
                {this.props.data.handleExpandableData(data)}
                {/* <Form.Item label="Name" className='form-item-margin'  >
                    {data.name}
                </Form.Item> */}
            </Form>
        )

    }

    datemaker = (date) => {
        if (date) {
            var t = new Date(date * 1000);
            date = ("0" + t.getDate()).slice(-2) + '/' + ("0" + (t.getMonth() + 1)).slice(-2) + '/' + (t.getFullYear());
        }
        return date
    }

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleOk = () => {
        this.setState({ isModalVisible: false });
        form.current.setFieldsValue({
            'name': ''
        })
        this.props.data.handleOk()
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };


    render() {
        const { selectedRowKeys } = this.props;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.onSelectionChange(selectedRowKeys, selectedRows);
            }
        };
        if (this.state.buttonAction) {
            this.onSelectionChange(this.state.selectedRowKeys, this.state.selectedRows);
        }


        return (
            <Card title={this.props.data.title}>
                <div className="components-table-demo-control-bar">
                    <Form ref={form} layout="inline" initialValues={{ userSelect: 'all' }}>
                        {this.props.menu ?
                            <FormItem>
                                <Dropdown
                                    overlay={this.props.menu}
                                    trigger={['click']}
                                    disabled={selectedRowKeys.length === 0}
                                >
                                    <Button style={{ marginBottom: 0 }} >
                                        Action <CaretDownOutlined />
                                    </Button>
                                </Dropdown>
                            </FormItem> :
                            null}
                        {this.props.data.handleSendNotification ?
                            <FormItem>
                                <Button
                                    type='primary'
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => this.props.history.goBack()}
                                    style={{ marginBottom: 0 }}
                                >
                                    Back
                                </Button>
                            </FormItem>
                            : null}
                        {this.props.data.search ?
                            <FormItem>
                                <Search
                                    placeholder={'Search'}
                                    onChange={this.onSearchStringChange}
                                    onSearch={this.onSearch}
                                    value={this.state.searchPending}
                                    allowClear
                                    style={{ width: 400, marginRight: 10, verticalAlign: 'middle' }}
                                />
                            </FormItem>
                            :
                            <FormItem>
                                <Search
                                    placeholder={'Search'}
                                    onSearch={this.onSearch}
                                    value={this.state.searchPending}
                                    allowClear
                                    style={{ width: 400, marginRight: 10, verticalAlign: 'middle' }}
                                />
                            </FormItem>}

                        {this.props.data.isUserSelect ?
                            <UserDropdown
                                showSearch={true}
                                initialValue={'AllUsers'}
                                placeholder={'Select User'}
                                field={this.props.form}
                                display={true}
                                list={this.props.userList}
                                onChange={this.onUserSelect}
                            />
                            : null}
                        <FormItem>
                            <Button
                                type='primary'
                                icon={<ReloadOutlined />}
                                onClick={this.props.data.handleRefresh}
                                style={{ marginBottom: 0 }}
                            >
                                Refresh
                            </Button>
                        </FormItem>

                        {this.props.data.addNewDataUrl ?
                            <FormItem>
                                <Link to={this.props.data.addNewDataUrl}>
                                    <Button
                                        type='primary'
                                        icon={<PlusOutlined />}
                                    >
                                        {this.props.data.button}
                                    </Button>
                                </Link>
                            </FormItem>
                            : null}
                        {this.props.data.handleAllUserNotification ?
                            <FormItem>
                                <Button
                                    type='primary'
                                    icon={<SendOutlined />}
                                    onClick={this.props.data.handleAllUserNotification}
                                    disabled={selectedRowKeys.length === 0}
                                >
                                    {this.props.data.SendAllNotificationButton}
                                </Button>
                            </FormItem>
                            : null}
                        {this.props.data.handleSendNotification ?
                            <FormItem>
                                <Button
                                    type='primary'
                                    onClick={this.props.data.handleSendNotification}
                                    icon={<SendOutlined />}
                                >
                                    {this.props.data.SendNotificationButton}
                                </Button>
                            </FormItem>
                            : null}
                        {this.props.data.deleteButton ?
                            <FormItem>
                                <Button
                                    type='primary'
                                    icon={<DeleteOutlined />}
                                    onClick={this.props.data.handleDelete}
                                >
                                    {this.props.data.deleteButton}
                                </Button>
                            </FormItem>
                            : null}

                        {/* {this.props.data.ShowMore ?
                            <FormItem>
                                <Button
                                    type='primary'
                                    icon={<ReloadOutlined />}
                                    onClick={this.props.data.ShowMore}
                                    style={{ marginBottom: 0 }}
                                >
                                    ShowMore
                                </Button>
                            </FormItem> : null} */}

                        {this.props.data.model ?
                            <>
                                <Button
                                    type='primary'
                                    icon={<PlusOutlined />}
                                    onClick={this.showModal}>
                                    {this.props.data.button}
                                </Button>
                                <Modal title={this.props.data.modeltitle} visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                                    <InputText
                                        label='Name'
                                        name='name'
                                        field={this.props.form}
                                        validationMessage='Please input correct name'
                                        requiredMessage='Please input name'
                                        onChange={(e) => this.props.data.handleData(e, 'name')}
                                        display={true}
                                        required={true}
                                    />

                                    {this.props.data.selectName &&
                                        <InputSelect
                                            label={this.props.data.selectName}
                                            name='main_activity'
                                            field={this.props.form}
                                            validationMessage='Please select correct activity type'
                                            requiredMessage='Please Select activity type'
                                            onChange={(e) => this.props.data.handleData(e, 'main_activity')}
                                            display={true}
                                            required={true}
                                            list={this.props.data.selectList}
                                        />
                                    }

                                    {this.props.data.descriptionName &&
                                        <InputTextArea
                                            label={this.props.data.descriptionName}
                                            field={this.props.form}
                                            name={'description'}
                                            validationMessage='Please input correct name'
                                            requiredMessage='Please input name'
                                            onChange={(e) => this.props.data.handleData(e, 'description')}
                                            display={true}
                                            required={true}
                                        />
                                    }
                                </Modal >
                            </> : null}

                    </Form>
                </div>
                {this.props.data.expandable && this.props.data.isNoneSelectable ?
                    <Table
                        className="gx-table-responsive"
                        columns={this.props.data.columns}
                        dataSource={this.state.filterData || this.props.dataSource}
                        loading={this.props.loadingData}
                        expandable={{
                            expandedRowRender: record => <div style={{ margin: 0 }}>{this.expandedRowData(record)}</div>,
                        }}
                        rowKey='_id'
                    />
                    :
                    this.props.data.expandable ?
                        <Table
                            className="gx-table-responsive"
                            columns={this.props.data.columns}
                            dataSource={this.state.filterData || this.props.dataSource}
                            loading={this.props.loadingData}
                            expandable={{
                                expandedRowRender: record => <div style={{ margin: 0 }}>{this.expandedRowData(record)}</div>,
                            }}
                            rowKey='_id'
                            rowSelection={{
                                type: 'radio',
                                ...rowSelection,
                            }}
                        />
                        :
                        this.props.data.isNoneSelectable ?
                            <Table
                                className="gx-table-responsive"
                                columns={this.props.data.columns}
                                dataSource={this.state.filterData || this.props.dataSource}
                                loading={this.props.loadingData}
                                rowKey='_id'

                            />
                            : <Table
                                onChange={this.handleChange}
                                className="gx-table-responsive"
                                columns={this.props.data.columns}
                                scroll={{ x: this.props.data.xScroll, }}
                                dataSource={this.state.filterData || this.props.dataSource}
                                loading={this.props.loadingData}
                                rowKey='_id'
                                rowSelection={{
                                    type: this.props.data.selectionType ? this.props.data.selectionType : 'radio',
                                    ...rowSelection,
                                }}
                            />
                }
            </Card>
        );
    }
}

export default DefaultTable;
