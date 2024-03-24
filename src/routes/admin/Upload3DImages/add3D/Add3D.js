import { Col, message, Row } from "antd"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import InputRadio from "../../../../components/InputControl/InputRadio/InputRadio"
import InputSelect from "../../../../components/InputControl/InputSelect/InputSelect"
import InputId from "../../../../components/InputControl/InputText/InputId"
import UploadFile from "../../../../components/InputControl/UploadFile/UploadFile"
import AllWallpaperTypeService from "../../../../service/AllWallpaperTypeService"
import Images3DService from "../../../../service/Images3DService"


const Add3D = (props) => {
    const [image_urls, setImage_Urls] = useState([])
    const [path, setPath] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [wallpapertypeList, setWallpapertypeList] = useState([])


    useEffect(() => {
        fetchDataTypes()
        fetchdata()
    }, [])


    const fetchDataTypes = async () => {
        await AllWallpaperTypeService.GetAllWallpaperType({})
            .then((response) => {
                console.log("response", response);
                setWallpapertypeList(response.data)
            })
            .catch((err) => {
                console.log(err)
                message.error(err.message);
            })
    }

    const fetchdata = async () => {
        if (props.location.state !== undefined && props.location.state.id) {
            props.spinLoading(true)
            setIsEdit(true)
            await Images3DService.Get3DWallpaperById(props.location.state.id)
                .then((result) => {
                    var data = result.data
                    props.formRef.current.setFieldsValue({
                        _id: data._id,
                        name: data.name,
                        type: data.type._id,
                        url: data.url,
                        createdAt: data.createdAt,
                        is_active: data.is_active,
                        modified_by: data.modified_by._id,
                    });
                    setImage_Urls(data.url)
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
                    <InputId
                        field={props.form}
                        label='name'
                        name="name"
                        validationMessage='Please select activity type'
                        requiredMessage='Please Select'
                        required={true}
                        display={true}
                    />
                </Col>
            </Row>

            <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    <InputSelect
                        field={props.form}
                        label='Wallpaper Type'
                        name={'type'}
                        validationMessage='Please select activity type'
                        requiredMessage='Please Select'
                        display={true}
                        required={true}
                        showSearch={true}
                        list={wallpapertypeList}
                    />
                </Col>
            </Row>

            <Row type="flex" justify="center">
                <Col sm={12} xs={24}>
                    {isEdit &&
                        <UploadFile
                            field={props.formRef}
                            label='3DImage'
                            name='url'
                            requiredMessage='Please Upload Image'
                            required={true}
                            params={path}
                            maxCount={1}
                            fileListUrl={props.location && props.location.state ? props.location.state.editData.url : image_urls}
                        />
                    }

                    {!isEdit &&
                        <UploadFile
                            field={props.formRef}
                            label='3DImage'
                            name='url'
                            requiredMessage='Please Upload Image'
                            required={true}
                            maxCount={1}
                            params="3DImages/"
                            fileListUrl={props.location && props.location.state ? props.location.state.editData.url : image_urls}
                        />
                    }
                </Col>
            </Row>

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

        </React.Fragment >
    );

}

export default withRouter(Add3D);
