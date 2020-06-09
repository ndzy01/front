import React, { useState, useEffect } from "react";
import { createHashHistory } from "history";

import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { Button, message, Upload,Row,Col,Input,Select } from "antd";
import api from "../../http";
import './iEdit.scss'
const history = createHashHistory();
const {Option} = Select

export default function EditC(props: any) {
  const [title, setTitle] = useState("");
  const [isLeaf, setIsLeaf] = useState("");
  const [content, setContent] = useState(BraftEditor.createEditorState(null));
  const controls: any = [
    "headings",
    "font-size",
    "list-ul",
    "list-ol",
    "text-color",
    "bold",
    "italic",
    "underline",
    "code",
    "hr",
    "link",
    "clear",
  ];

  const uploadProps = {
    name: "file",
    action: "http://www.ndzy01.com:8888/upload/",
    headers: {
      authorization: "authorization-text",
    },
  };

  const extendControls: any = [
    {
      key: "antd-uploader",
      type: "component",
      component: (
        <Upload
          {...uploadProps}
          accept="image/*"
          showUploadList={false}
          onChange={(info: any) => {
            if (info.file.status !== "uploading") {
              // console.log(info.file, info.fileList)
            }
            if (info.file.status === "done") {
              message.success(`${info.file.name} file uploaded successfully`);
              setContent(
                ContentUtils.insertMedias(content, [
                  {
                    type: "IMAGE",
                    url: info.file.response.data.url,
                  },
                ])
              );
          
            } else if (info.file.status === "error") {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button
            className="control-item button upload-button"
            data-title="插入图片"
          >
            插入图片
          </Button>
        </Upload>
      ),
    },
  ];

  useEffect(() => {
    if (props.eid !== "") {
      api("/tree/getArticleById", "POST", {
        id: props.eid,
      }).then((res:any) => {
        setTitle(res.data.data.title);
        setIsLeaf(res.data.data.isLeaf)
        setContent(BraftEditor.createEditorState(res.data.data.content));
      });
    }
  }, [props]);

  return (<div className="i-edit">
        <Row>
          <Col span={15}>
            <Input readOnly value={title}></Input>
          </Col>
          <Col span={3}>
        <Input value={isLeaf} onChange={
          (event) => {
            if (event.target.value === "0") {
              setIsLeaf("0")
            }
            if (event.target.value === "1") {
              setIsLeaf("1")
            }
          }
          }></Input>
          </Col> 
        
          <Col span={3}>
        <Select defaultValue="文件" style={{ width: 120 }} onChange={(value) => {
              setIsLeaf(value)
          
          }}>
      <Option value="0">文件</Option>
      <Option value="1">文件夹</Option>
    
    </Select>
          </Col> 
          <Col span={3}>
          <Button
            type="primary"
            onClick={() => {
              api("/tree/edit", "POST", {
                id: props.eid,
                content: content.toHTML(),
                isLeaf:isLeaf
              }).then((res:any) => {
                message.success("successfully edited");
                history.push({ pathname: "/" });
              });
            }}
          >
            Submit
          </Button>
          </Col>
        </Row>
       
        <div>
          <BraftEditor
         
            className="my-editor body"
            value={content}
            controls={controls}
            extendControls={extendControls}
            onChange={(editorState) => {
              setContent(editorState);
            }}
            placeholder="Please enter the text content!"
          />
        </div>
      </div>)
  

}