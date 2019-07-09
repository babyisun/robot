import React from 'react';
// import { observer } from 'mobx-react';
import { Form, Row, Col } from 'antd';

import styles from './items.scss';

const FormItem = Form.Item;

// @observer
class Item extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      data,
      children,
    } = this.props;
    return (
      <div className={styles.form}>
        <Row gutter={24} type="flex" justify="start">
          {data
            && data.length
            && data.map((item, index) => (
              <Col span={item && item.span ? item.span : 12} key={index}>
                {item && (
                  <FormItem label={item.label}>
                    {getFieldDecorator(item.value, { ...item.option })(item.el)}
                  </FormItem>
                )}
              </Col>
            ))}
        </Row>
        {children}
      </div>
    );
  }
}

export default Item;
