import React, { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
// import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import logo from '../../assets/diggo.png';
import styles from './style.less';
import Link from 'umi/link';


@connect( userregister => ({ userregister, loading }) => ({
    msg: userregister.data,
    loading: loading.models.list
}))

class Register extends PureComponent{
    state = {
        confirmDirty: false,
        // autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            const { dispatch } = this.props;
            const params = {
                email: values.email,
                pwd: values.password
            }
            dispatch({
                type: 'userregister/fetch',
                payload: JSON.stringify(params)
            })
          }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className={styles.wrapper}></div>
                <div className={styles.registbox}>
                    <img className={styles.logo} src={logo} alt=""/>
                    {/* <h3 className={styles.title}>注册</h3> */}
                    <Form wrapperCol={{ span: 24}} onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                {
                                    type: 'email',
                                    message: '请输入正确的邮箱!',
                                },
                                {
                                    required: true,
                                    message: '请输入你的邮箱!',
                                },
                            ],
                            })(<Input placeholder="请输入您的邮箱" size="large" />)}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                                ],
                            })(<Input.Password placeholder="请输入密码" size="large"/>)}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                {
                                    required: true,
                                    message: '请再次输入你的密码!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                                ],
                            })(<Input.Password placeholder="确认密码" size="large" onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles.submit} type="primary" htmlType="submit" size="large">
                                注册
                            </Button>
                            <Link className={styles.login} to='/user/login'>使用已有账号登录</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Register)