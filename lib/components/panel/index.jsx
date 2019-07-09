import React from 'react';
import styles from './index.scss';

const MESSAGE = {
  NOPOWER: { title: '无权限', content: '您的账号无权限，请联系管理员' },
  FROZEN: { title: '被冻结', content: '账号被冻结了' },
  ERROR: { title: 'Error', content: '服务器加载异常' },
};
/**
 * 提示面板
 *
 * @param  {MESSAGE} message title:显示的文字，content：显示的内容提示 <Panel message={MESSAGE.FROZEN} />
 */
const Panel = ({ message }) => {
  if (message) {
    return (
      <div className={styles.message}>
        <h2>{message.title}</h2>
        <p>{message.content}</p>
      </div>
    );
  }
  return null;
};

export { Panel, MESSAGE };
