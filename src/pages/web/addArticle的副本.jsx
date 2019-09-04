import { Upload, message, Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';
import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';
import { connect } from 'dva';
// import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
    },
};

@connect(releasearticle => ({ releasearticle, loading }) => ({
    // msg: releasearticle.data,
    // loading: loading.models.list,
}))

class addArticle extends React.Component{
    state = {
        editorState: null
    }
    async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    // this.setState({
    //     editorState: BraftEditor.createEditorState(htmlContent)
    // })
    }

    submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState) => {
        console.log(editorState)
        this.setState({ editorState })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // if(!err){
                const { dispatch } = this.props;
                const params = {
                  title: values.title,
                  content: this.state.editorStates,
                  file_url: values.file_url,
                  uid: localStorage.getItem('userid')
                };
                dispatch({
                  type: 'releasearticle/fetch',
                  payload: JSON.stringify(params),
                });
            // }
        })
    }
    render(){
        const { editorState } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper title="发布文章">
                <Card>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="标题" labelCol={{span: 2}} wrapperCol={{span: 10}}>
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写标题'
                                    }
                                ]
                            })(
                                <Input />
                            )}  
                        </Form.Item>
                        <Form.Item label="内容" labelCol={{span: 2}} wrapperCol={{span: 22}}>
                            {/* {getFieldDecorator('content', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写内容'
                                    }
                                ]
                            })( */}
                                {/* <div className={styles.borderwp}>
                                    <BraftEditor
                                        value={editorState}
                                        onChange={this.handleEditorChange}
                                        onSave={this.submitContent}
                                    />
                                </div> */}
                            {/* )}   */}
                            
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 2 }}>
                            {getFieldDecorator('file_url')(
                                <Upload {...props}>
                                    <Button>
                                    <Icon type="upload" /> 上传代码压缩包
                                    </Button>
                                </Upload>
                            )}    
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 2 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>         
                </Card>
            </PageHeaderWrapper>
        )
    }
    
};
export default Form.create()(addArticle);