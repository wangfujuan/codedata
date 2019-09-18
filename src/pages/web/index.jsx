import { Card, List, Avatar, Icon, Row, Col, Button, Divider, Tag } from 'antd';
import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import ArticleListContent from './components/ArticleListContent';
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
        {/* <Row gutter={16}> */}
        <Card
          style={{
            marginTop: 24,
          }}
          bordered={false}
          bodyStyle={{
            padding: '8px 32px 32px 32px',
          }}
        >
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
              // <Col span={12}>
              // <div
              //   style={{
              //     backgroundColor: '#fff',
              //     borderRadius: '2px',
              //     marginBottom: '16px',
              //     paddingLeft: '24px',
              //     paddingRight: '24px',
              //   }}
              // >
              <List.Item key={item.title} extra={<img width={272} alt="logo" src={item.image} />}>
                <List.Item.Meta
                  // avatar={
                  //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  // }
                  title={<a href="/web/articledetail">{item.title}</a>}
                  description={
                    <span>
                      <Tag>菜单</Tag>
                      <Tag>动画</Tag>
                      <Tag>CSS</Tag>
                    </span>
                  }
                />
                {/* <div dangerouslySetInnerHTML={{ __html: item.desp }} /> */}
                <ArticleListContent data={item} />
              </List.Item>
              // </div>
              // </Col>
            )}
          />
        </Card>
        {/* </Row> */}
      </PageHeaderWrapper>
    );
  }
}

export default Test;
