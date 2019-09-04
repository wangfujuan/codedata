import { Card, List, Avatar, Icon, Row, Col, Button, Divider } from 'antd';
import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import Link from 'umi/link';

@connect(getlist => ({ getlist, loading }) => ({
  list: getlist.data,
  loading: loading.models.list,
}))
class Test extends PureComponent {
  componentWillMount() {
    console.log('渲染前调用');
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const params = {
      tid: '2',
      uid: '2',
    };
    dispatch({
      type: 'getlist/fetch',
      payload: JSON.stringify(params),
    });
  }

  render() {
    const { list } = this.props.list;
    // console.log('hahah'+JSON.stringify(this.props.list));
    // console.log('hahah'+this.props.list.title);
    console.log(list);
    return (
      // <div></div>
      <PageHeaderWrapper>
        <Link className="ant-btn ant-btn-primary" to="/web/addarticle">
          <Icon type="plus" />
          发布
        </Link>
        {/* <a className="ant-btn ant-btn-primary" href="./web/addarticle"></a> */}
        <Row gutter={16}>
          <List
            itemLayout="vertical"
            size="large"
            // split="true"
            pagination={{
              // marginRight: '10px',
              onChange: page => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={list}
            renderItem={item => (
              <Col span={12}>
                <div
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '2px',
                    marginBottom: '16px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                  }}
                >
                  <List.Item
                    key={item.title}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href={item.href}>ant design part</a>}
                      // description={item.addtime}
                    />
                    We supply a series of design principles, practical patterns and high quality
                    design resources (Sketch and Axure), to help people create their product
                    prototypes beautifully and efficiently.
                    {/* {item.content} */}
                  </List.Item>
                </div>
              </Col>
            )}
          />
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Test;
