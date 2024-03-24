import React, { useState } from 'react';
import {
    Button,
    Card,
    Form,
    Spin
} from "antd";
import EditProfile from './EditProfile';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './userDetails.css'
import { useHistory, withRouter } from 'react-router-dom';
import { GetCurrentLoggedUserDetails } from '../../hooks/AuthHooks';

const FormItem = Form.Item;

const Profile = (props) => {

    const [error, setError] = useState("");
    const [loadingData, setLoadingData] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)

    const formRef = React.createRef();
    const history = useHistory()

    const onSave = async (values) => {
        setLoadingData(true)
        var userAccessToken = GetCurrentLoggedUserDetails();
        values.modified_by = userAccessToken.id
        // await updateMainActivity({
        //     variables: {
        //         'id': values.id,
        //         'name': values.name,
        //         'main_activity': values.main_activity,
        //         'description': values.description,
        //         'country': values.country,
        //         'state': values.state,
        //         'city': values.city,
        //         'video_url': values.video_url,
        //         'is_active': values.is_active,
        //         'modified_by': values.modified_by,
        //     }
        // })
        //     .then((res) => {
        //         if (res.error) {
        //             setLoadingData(false)
        //         } else {
        //             setLoadingData(false)
        //             if (res.data) {
        //                 notify.openNotificationWithIcon('success', 'Success', "Main Activity successfully Update");
        //                 history.push('/mainactivities')
        //             } else {
        //                 notify.openNotificationWithIcon('error', 'Fail', 'Something wrong');
        //             }
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error ', error);
        //     });
        // setLoadingData(false)
    }



    const onSaveFailed = () => {
        console.log('please fill all field correctly')
    }

    const { form } = props;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 9 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 15 },
        },
    };

    return (
        <Card title='Profile'>
            <Spin tip="Loading..." spinning={spinLoading}>
                <Form ref={formRef} form={form} onFinishFailed={onSaveFailed} onFinish={onSave} {...formItemLayout}>
                    <div className="components-table-demo-control-bar">
                        <FormItem
                            className='header-button-content'>
                            <Button
                                type='primary'
                                icon={<ArrowLeftOutlined />}
                                onClick={() => props.history.goBack()}
                                style={{ marginBottom: 0 }}
                            >
                                Back
                            </Button>
                        </FormItem>
                        <FormItem
                            className='header-button-content'>
                            <Button
                                type='primary'
                                htmlType="submit"
                                loading={loadingData}
                                style={{ marginBottom: 0 }}
                            >
                                Save Details
                            </Button>
                        </FormItem>
                    </div>
                    <EditProfile formRef={formRef} form={form} spinLoading={e => setSpinLoading(false)} />
                </Form>
            </Spin>
        </Card>
    );
}

export default withRouter(Profile);