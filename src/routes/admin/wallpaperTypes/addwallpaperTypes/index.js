import React, { useRef, useState } from 'react';
import {
  Button,
  Card,
  Form,
  message, Spin
} from "antd";
import AddwallpaperTypes from './AddwallpaperTypes';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './userDetails.css'
import { useHistory, withRouter } from 'react-router-dom';
import notify from '../../../../Notification';
import AllWallpaperTypeService from "../../../../service/AllWallpaperTypeService";
import { GetCurrentLoggedUserDetails } from '../../../../service/TokenService';

const FormItem = Form.Item;

const AddWallpaperTypesDetails = (props) => {
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
      await AllWallpaperTypeService.UpdateWallpaper(data)
        .then((result) => {
          console.log(result)
          if (result.status_code === 200) {
            notify.openNotificationWithIcon('success', 'Success', "wallpaperType successfully Update");
            setTimeout(() => {
              history.push('/wallpaperType')
            }, 1000);
          }
        }).catch((err) => {
          console.log(err);
          message.error(err.message)
        })
    } else {
      if (data.id === undefined) {
        delete data.id
      }
      if (data.modified_by === undefined) {
        var userAccessToken = GetCurrentLoggedUserDetails();
        data.modified_by = userAccessToken._id
      }
      await AllWallpaperTypeService.AddWallpaper(data)
        .then((result) => {
          console.log(result)
          if (result.status_code === 200) {
            notify.openNotificationWithIcon('success', 'Success', "wallpaperType successfully add");
            setTimeout(() => {
              history.push('/wallpaperType')
            }, 1000);
          } else {
            notify.openNotificationWithIcon('error', 'Fail', 'Something wrong');
          }
        }).catch((err) => {
          console.log(err);
          message.error(err.message)
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
    <Card title={props.location.state === undefined ? "Add wallpaperType" : 'Edit wallpaperType'}>
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
          <AddwallpaperTypes formRef={formRef} form={form} spinLoading={(e) => setSpinLoading(e)} />
        </Form>
      </Spin>
    </Card>
  );
}


export default withRouter(AddWallpaperTypesDetails);
