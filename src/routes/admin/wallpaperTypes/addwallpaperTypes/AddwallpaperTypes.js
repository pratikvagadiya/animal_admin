import React, { useEffect, useState } from 'react';
import { Col, Row, message } from "antd";
import { withRouter } from 'react-router-dom';
import InputText from '../../../../components/InputControl/InputText/InputText';
import InputRadio from '../../../../components/InputControl/InputRadio/InputRadio';
import InputId from '../../../../components/InputControl/InputText/InputId';
import AllWallpaperTypeService from '../../../../service/AllWallpaperTypeService';

const AddWallpaperTypes = (props) => {
    // const [activitytypeList, setActivitytypeList] = useState([])


    useEffect(() => {
        fetchdata()
        // fetchDataTypes()
    }, [])

    // const fetchDataTypes = async () => {
    //     await AllWallpaperTypeService.GetAllWallpaperType({})
    //         .then((response) => {
    //             console.log("response", response);
    //             setActivitytypeList(response.wallpaperData)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const fetchdata = async () => {
        if (props.location.state !== undefined && props.location.state.id) {
            props.spinLoading(true)
            await AllWallpaperTypeService.GetMainWallpaperById(props.location.state.id)
                .then((result) => {
                    console.log("result", result);
                    var activitydata = result.data
                    props.formRef.current.setFieldsValue({
                        _id: activitydata._id,
                        name: activitydata.name,
                        type: activitydata.type,
                        createdAt: activitydata.createdAt,
                        is_active: activitydata.is_active,
                        modified_by: activitydata.modified_by._id,
                    });
                    props.spinLoading(false)
                }).catch((err) => {
                    console.log(err);
                    message.error(err.message);
                    props.spinLoading(false)
                })
        }
    }

    return (
        <React.Fragment>
            <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    <InputId
                        field={props.form}
                        label='form.label.id'
                        name="_id"
                        display={false}
                    />
                </Col>
            </Row>

            <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    <InputText
                        field={props.form}
                        label='Name'
                        name='name'
                        validationMessage='Please input correct name'
                        requiredMessage='Please input name'
                        display={true}
                        required={true}
                    />
                </Col>
            </Row>
            {/* <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    <InputSelect
                        field={props.form}
                        label='Activity Type'
                        name='type'
                        validationMessage='Please select activity type'
                        requiredMessage='Please Select'
                        display={false}
                        list={activitytypeList}
                    />
                </Col>
            </Row> */}
            <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    <InputRadio
                        field={props.form}
                        label='Active'
                        name='is_active'
                        requiredMessage='select.status'
                        required={true}
                    />
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    <InputText
                        field={props.form}
                        label='createdAt'
                        name="createdAt"
                        display={false}
                    />
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    <InputText
                        field={props.form}
                        label='modified_by'
                        name="modified_by"
                        display={false}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );

}

export default withRouter(AddWallpaperTypes);
