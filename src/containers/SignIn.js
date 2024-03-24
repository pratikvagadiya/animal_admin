import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import notify from '../Notification';
import { hideAuthLoader, hideMessage, showAuthLoader, userSignInSuccess } from "../appRedux/actions/Auth";
import CircularProgress from "../components/CircularProgress";
import SinginService from "../service/SinginService";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideMessage());
    }, 100);
  });

  const onFinishFailed = errorInfo => {
    dispatch(hideAuthLoader());
    setIsLoading(false)
    console.log('Failed:', errorInfo);
  };


  const onFinish = async values => {
    setIsLoading(true)
    dispatch(showAuthLoader());
    await SinginService.Singin({ email: values.email, password: values.password })
      .then((success) => {

        window.sessionStorage.setItem("user_token", success.token);
        setIsLoading(false)
        notify.openNotificationWithIcon('success', 'Success', "Signin has been successfully done");
        dispatch(userSignInSuccess(success))
        if (success.message === "Login Successfully") {
          history.push("/wallpaperType");
        }
      })
      .catch((err) => {
        console.log(err);
        notify.openNotificationWithIcon('error', 'Fail', 'Something wrong');
        message.error('error', 'Fail', 'User not authorized')
      })

  };

  const Background = "https://c1.wallpaperflare.com/preview/1015/974/530/landscape-vacation-nature-adventure.jpg"

  return (
    <div className="gx-app-login-wrap" style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}>
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">

              <img src={"https://c4.wallpaperflare.com/wallpaper/919/575/783/nature-landscape-lake-mountains-wallpaper-preview.jpg"} alt='Neature' />
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn" /></h1>
              <p><IntlMessages id="app.userAuth.bySigning" /></p>
              <p><IntlMessages id="app.userAuth.getAccount" /></p>
            </div>

          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                initialValue="shreehariji.test@gmail.com"
                rules={[{ required: true, message: 'The input is not valid E-mail!' }]} name="email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                initialValue="Demo123!@#"
                rules={[{ required: true, message: 'Please input your Password!' }]} name="password">
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button loading={isLoading} type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>

              </Form.Item>
            </Form>
          </div>

          {loader ?
            <div className="gx-loader-view">
              <CircularProgress />
            </div> : null}
          {showMessage ?
            message.error(alertMessage.toString()) : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
