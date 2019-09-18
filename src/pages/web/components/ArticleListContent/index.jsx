import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

const ArticleListContent = ({ data: { desp, addtime, avatar, owner, href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description} dangerouslySetInnerHTML={{ __html: desp }} />
    {/* <div className={styles.description} >{content}</div> */}
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a href={href}>{owner}王芙娟</a> 发布在 <a href={href}>htts://www.diggo.com</a>
      <em>{moment(addtime).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
