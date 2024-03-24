import React from "react";
import { Button, Card, message, Upload } from "antd";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import { UploadOutlined } from "@ant-design/icons";
var AWS = require('aws-sdk');

AWS.config.update(config);  

const Dragger = Upload.Dragger;
var s3 = new AWS.S3();

const DragDrop = (props) => {
  const setList = () => {
    if (props.url) {
      return ([{
        uid: '1',
        name: props.url.split("/").slice(-1),
        status: 'done',
        response: 'done',
        url: "https://" + props.url,
      }]);
    }
  }
  let disable = false;
  const uploadProps = {
    name: 'file',
    maxCount: 1,
    multiple: false,
    defaultFileList: setList(),
    beforeUpload: file => {
      console.log(file)
      if (disable) {
        message.error(`Only one file can be added.`);
        return Upload.LIST_IGNORE;
      }
      if (file.type.split("/", 1)[0] !== props.type) {
        message.error(`${file.name} is not a ${props.type} file.`);
        return Upload.LIST_IGNORE;
      } else if (props.path === '' || props.path === undefined) {
        message.error(`Select type or enter name first.`)
        return Upload.LIST_IGNORE;
      }
      else {
        return true
      }
    },
    customRequest: ({ onSuccess, onError, file }) => {
      let params = {
        Bucket: 'awsadventure',
        Key: props.path + props.type + "/" + file.name,
        ContentType: file.type,
        Body: file,
        ACL: 'public-read'
      }
      s3.upload(params, function (err, data) {
        if (err) {
          console.log(err);
          onError()
        }
        else {
          sendData(data.Key)
          onSuccess()
        }
      });
    },
    onChange: (e) => {
      let fileList = [...e.fileList];
      if (fileList.length === 1) {
        disable = true;
      } else disable = false;
    },
    onRemove: file => {
      let params = { Bucket: 'awsadventure', Key: props.path + props.type + "/" + file.name };
      s3.deleteObject(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
      });
    }
  };

  const sendData = (data) => {
    if (props.id) {
      props.dataUrl(props.id, "dol6abvnso447.cloudfront.net/" + data)
    } else props.dataUrl("dol6abvnso447.cloudfront.net/" + data)
  }

  if (props.url && disable === false) {
    sendData(props.url.split("/").slice(-1))
  }

  return (
    <>
      {props.element === "drag" ?
        <Card className="gx-card" title={props.title}>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Card>
        : props.element === "simple" ?
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> : ""
      }

    </>
  );
};

export default DragDrop;
