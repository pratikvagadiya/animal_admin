import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from "antd";
import { withRouter } from 'react-router-dom';
import InputText from '../InputControl/InputText/InputText';
import InputSelect from '../InputControl/InputSelect/InputSelect';
import InputRadio from '../InputControl/InputRadio/InputRadio';
import InputId from '../InputControl/InputText/InputId';
import InputTextArea from '../InputControl/InputText/TextAreas';
import InputPhone from '../InputControl/InputPhone/InputPhone';
import InputNumber from '../InputControl/InputNumber/InputNumber';
import { GetUserById } from '../../hooks/UsersHooks';
import { GetCurrentLoggedUserDetails } from '../../hooks/AuthHooks';
import { Label } from 'recharts';

const EditProfile = (props) => {

    const [loadingData, setLoadingData] = useState(false)
    const [genderList, setGenderList] = useState([
        { name: 'Male', id: 'Male' },
        { name: 'Female', id: 'Female' },
        { name: 'Other', id: 'Other' },
    ])

    const { UserById } = GetUserById()

    useEffect(async () => {
        await fetchdata()
    }, [])


    const fetchdata = async () => {
        setLoadingData(true)
        let userprofile = GetCurrentLoggedUserDetails();
        await UserById({
            variables: {
                'id': userprofile.id
            },
            onCompleted: (res) => {
                var data = res.getUserById
                props.formRef.current.setFieldsValue({
                    id: data._id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone_number: data.phone_number,
                    age: data.age,
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    address: data.address,
                    address1: data.address1,
                    pincode: data.pincode,
                    gender: data.gender,
                    health_status: data.health_status,
                    marital_status: data.marital_status,
                    membership: data.membership,
                    is_active: data.is_active,
                    gender: data.gender,
                });
                setLoadingData(false)
            }
        })
    }

    const handleChangepassword = () => {
        console.log('hello');
    }

    return (
        <React.Fragment >
            <Row>
                <Col span={12}>

                    <InputId
                        field={props.form}
                        label='form.label.id'
                        name="id"
                        display={false}
                    />

                    <InputText
                        field={props.form}
                        label='First Name'
                        name='first_name'
                        validationMessage='Please input correct name'
                        requiredMessage='Please input name'
                        display={true}
                        required={true}
                    />

                    <InputText
                        field={props.form}
                        label='Last Name'
                        name='last_name'
                        validationMessage='Please input correct name'
                        requiredMessage='Please input name'
                        display={true}
                        required={true}
                    />

                    <InputText
                        field={props.form}
                        label='Email'
                        name='email'
                        validationMessage='Please input correct name'
                        requiredMessage='Please input name'
                        display={true}
                        required={true}
                        disabled
                    />

                    <InputPhone
                        field={props.form}
                        label='Phone Number'
                        name='phone_number'
                        validationMessage='Please input correct name'
                        requiredMessage='Please input name'
                        display={true}
                        required={true}
                    />

                    <InputNumber
                        field={props.form}
                        label='Age'
                        name='age'
                        validationMessage='Please input correct name'
                        requiredMessage='Please input name'
                        display={true}
                        required={true}
                    />

                    <InputSelect
                        field={props.form}
                        label='Gender'
                        name='gender'
                        validationMessage='Please input correct name'
                        requiredMessage='Please input name'
                        display={true}
                        required={true}
                        list={genderList}
                    />
                    <Form.Item label='Password'>
                        <Button type='primary' onClick={handleChangepassword} >Change Password</Button>
                    </Form.Item>
                </Col>
            </Row>

        </React.Fragment >
    );

}

export default withRouter(EditProfile);
