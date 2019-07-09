import React from 'react';
import { Button, Form, Row, Col } from 'antd';
import styles from './button.scss';

const FormItem = Form.Item;

const Btn = ({ onSubmit, history, loading = false }) => (
  <FormItem className={styles.btn}>
    <Row gutter={24} type="flex" justify="center">
      <Col>
        <Button type="primary" loading={loading} onClick={() => onSubmit()}>

          确定
        </Button>
      </Col>
      <Col>
        <Button onClick={() => history.goBack()}>返回</Button>
      </Col>
    </Row>
  </FormItem>
);

export default Btn;
