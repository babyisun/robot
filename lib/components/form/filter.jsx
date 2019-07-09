import React, { Component } from "react";
import { Button, Form, Row, Col } from "antd";
import { clearNull } from "../../utils/format";
import log from "../../page/Download/storem";
import styles from "./filter.scss";
/*
 * Form
 * @param {object} form - Form.create() 注入的 `form` 对象
 * @param {array} fields - 表单组件集合
 * @param {object} formParams - 格式化表单数据
 * @param {function} onSearch - 根据筛选项查询
 * @param {function} onExport - 根据筛选项导出
 * @param {object} defaultValue - 给表单项绑定默认值
 *
 */
const FormItem = Form.Item;

const compareProps = (next, cur, fn) => fn(next) === fn(cur);
const isObject = obj =>
  Object.prototype.toString.call(obj) === "[object Object]";
const setDefaultFields = props => {
  const { defaultValue, form } = props;
  Object.entries(defaultValue).map(([k, v]) => form.setFieldsValue({ [k]: v }));
};

class Filter extends Component {
  componentDidMount() {
    const { defaultValue } = this.props;
    isObject(defaultValue) && setDefaultFields(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps;
    if (
      isObject(defaultValue) &&
      !compareProps(nextProps, this.props, ({ defaultValue: d }) =>
        JSON.stringify(d)
      )
    ) {
      setDefaultFields(nextProps);
    }
  }

  // 表单提交
  onSubmit = (e, action) => {
    e.preventDefault();

    const {
      form: { validateFields },
      formatParams,
      onSearch,
      onExport
    } = this.props;
    validateFields((err, values) => {
      values = clearNull(values);
      if (!err) {
        if (action === "onSearch") {
          !formatParams ? onSearch(values) : onSearch(formatParams(values));
        } else {
          const exprotParams = !formatParams
            ? { ...values }
            : formatParams(values);
          // delete exprotParams.page;
          // delete exprotParams.page_size;
          if (onExport) {
            onExport({ ...exprotParams, export: 1 });
          } else {
            log.setExportVisible({ ...exprotParams, export: 1 });
          }
        }
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  render() {
    const { fields, form, isExport, noReset, noInterval } = this.props;
    const { getFieldDecorator } = form;
    const len = fields.length;
    const btn = (
      <Col
        span={noInterval ? 10 : len < 3 ? 8 : null}
        className={len < 3 ? "FilterFormBtnInline" : "FilterFormBtn"}
      >
        <FormItem>
          <Button type="primary" htmlType="submit" icon="search" label="&nbsp;">
            搜索
          </Button>
          {isExport && (
            <Button icon="upload" onClick={e => this.onSubmit(e, "onExport")}>
              导出
            </Button>
          )}
          {!noReset && (
            <Button icon="reload" onClick={this.handleFormReset}>
              重置
            </Button>
          )}
        </FormItem>
      </Col>
    );
    return (
      <div>
        <Form
          className={styles.FilterForm}
          onSubmit={e => this.onSubmit(e, "onSearch")}
        >
          <Row gutter={noInterval ? 16 : 24} justify="center">
            {len &&
              fields.map((item, index) => {
                if (!item.option) {
                  item.option = { initialValue: "" };
                } else if (item.option && !item.option.initialValue) {
                  item.option.initialValue = "";
                }
                return (
                  <Col span={noInterval ? 7 : 8} key={index}>
                    <FormItem label={item.label}>
                      {getFieldDecorator(item.value, { ...item.option })(
                        item.el
                      )}
                    </FormItem>
                  </Col>
                );
              })}
            {len < 3 ? btn : null}
          </Row>
          {len >= 3 ? <Row justify="center">{btn}</Row> : null}
        </Form>
      </div>
    );
  }
}

export default Form.create()(Filter);
