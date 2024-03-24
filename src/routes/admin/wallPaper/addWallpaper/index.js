import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Form, message, Spin } from "antd";
import { useRef, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import notify from '../../../../Notification';
import { GetCurrentLoggedUserDetails } from "../../../../hooks/AuthHooks";
import Images2DService from "../../../../service/Images2DService";
import Add2D from "./addWallpaper";

const FormItem = Form.Item;

const AddMapDetails = (props) => {
    const [loadingData, setLoadingData] = useState(false)
    const [spinLoading, setSpinLoading] = useState(false)

    const formRef = useRef();
    const history = useHistory()

    const onSave = async (data) => {
        if (data.modified_by === undefined) {
            var userAccessToken = GetCurrentLoggedUserDetails();
            data.modified_by = userAccessToken._id
        }
        setLoadingData(true)
        if (data._id) {
            console.log("data", data)
            await Images2DService.Update2DWallpaper(data)
                .then((result) => {
                    if (result.status_code === 200) {
                        notify.openNotificationWithIcon('success', 'Success', "2D Wallpaper Successfully Update");
                        setTimeout(() => {
                            history.push('/2dwallpaper')
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                    message.error(err.message);
                })
        } else {
            if (data.id === undefined) {
                delete data.id
            }
            if (data.modified_by === undefined) {
                var userAccessToken = GetCurrentLoggedUserDetails();
                data.modified_by = userAccessToken._id
            }
            await Images2DService.Add2DWallpaper(data)
                .then((result) => {
                    if (result.status_code === 200) {
                        notify.openNotificationWithIcon('success', 'Success', "2D Wallpaper Successfully Add");
                        setTimeout(() => {
                            history.push('/2dwallpaper')
                        }, 1000);
                    } else {
                        notify.openNotificationWithIcon('error', 'Fail', 'Something wrong');
                    }
                }).catch((err) => {
                    console.log(err);
                    message.error(err.message);
                })
        }
        setLoadingData(false)
    };

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
        <Card title={props.location.state === undefined ? "Add 2D Images" : 'Edit 2D Images'}>
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
                    <Add2D formRef={formRef} form={form} spinLoading={(e) => setSpinLoading(e)} />
                </Form>
            </Spin>
        </Card>
    );
}



export default withRouter(AddMapDetails);
