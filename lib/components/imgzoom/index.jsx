import React from 'react';
import { Modal } from 'antd';
import styles from './index.scss';

const ImgZoomModal = ({ src, alt, close, visible }) => (
  <Modal
    className={styles.imgzoom}
    title={alt}
    visible={visible}
    onCancel={close}
    footer={null}
    destroyOnClose
  >
    <img src={src} alt={alt} />
  </Modal>
);

export default ImgZoomModal;
