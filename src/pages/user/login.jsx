import React, { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import logo from '../../assets/diggo.png';
import styles from './style.less';
import Link from 'umi/link';

@connect(login => ({ login, loading }) => ({
  msg: login.data,
  loading: loading.models.list,
}))
class LoginBox extends PureComponent {
  state = {
    confirmDirty: false,
    // autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('提交');
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const params = {
          email: values.email,
          pwd: values.password,
        };
        dispatch({
          type: 'login/login',
          payload: JSON.stringify(params),
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className={styles.wrapper}></div>
        <div className={styles.registbox}>
          <img className={styles.logo} src={logo} alt="" />
          {/* <h3 className={styles.title}>登录</h3> */}
          <Form wrapperCol={{ span: 24 }} onSubmit={this.handleSubmit}>
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
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ],
              })(<Input.Password placeholder="请输入密码" size="large" />)}
            </Form.Item>
            <Form.Item>
              <Button className={styles.submit} type="primary" htmlType="submit" size="large">
                登录
              </Button>
              <Link className={styles.login} to="/user/register">
                <FormattedMessage id="注册账户" />
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(LoginBox);
