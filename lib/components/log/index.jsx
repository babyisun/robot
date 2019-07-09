import React from 'react';
import { Modal, Timeline, Skeleton, Empty } from 'antd';

const { Item } = Timeline;

const LogModal = ({ title = '物流信息', data, close, visible, loading }) => (
  <Modal title={title} visible={visible} onCancel={close} footer={null} destroyOnClose>
    <Skeleton active loading={loading}>
      {data && data.length ? (
        <Timeline>
          {data.map((item, i) => (
            <Item color={i === 0 ? 'var(--primary-color)' : '#1890ff'} key={i}>
              {item.context} <div style={{ color: 'black' }}>{item.stime}</div>
            </Item>
          ))}
          {/* <Item>Create a services site 2015-09-01</Item> */}
        </Timeline>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Skeleton>
  </Modal>
);
export default LogModal;
