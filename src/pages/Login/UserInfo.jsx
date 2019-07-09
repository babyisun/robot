import React from "react";
import { Form, Modal } from "antd";
import styles from "./index.scss";

const { Item } = Form;

const UserInfo = ({ data, visible, hideModal }) => (
  <Modal
    title="个人信息"
    onCancel={hideModal}
    visible={visible}
    footer={null}
    destroyOnClose
    className={styles.userinfo}
  >
    {data &&
      data.map(
        (item, i) =>
          item && (
            <Item key={i} label={item.label}>
              <span>{item.value}</span>
            </Item>
          )
      )}
  </Modal>
);

export default UserInfo;
