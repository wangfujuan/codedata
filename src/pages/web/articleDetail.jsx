import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

@connect(getdetail => ({ getdetail, loading }) => ({
  list: getdetail.data,
  loading: loading.models.list,
}))
class DetailPage extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    const params = {
      aid: '6',
      uid: '2',
    };
    dispatch({
      type: 'getdetail/fetch',
      payload: JSON.stringify(params),
    });
  }
  render() {
    const { list } = this.props.list;
    console.log(list);
    return (
      <PageHeaderWrapper title="详情">
        <div style={{ width: '792px', margin: '0 auto', padding: '32px', backgroundColor: '#fff' }}>
          {/* <div dangerouslySetInnerHTML={{ __html: list.content }} /> */}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default DetailPage;
