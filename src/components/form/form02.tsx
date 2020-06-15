import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  TreeSelect,
  DatePicker,
  Cascader,
} from 'antd';
import './form02.scss';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
// TODO:相关api
// import pageModalApi from '../../../api/deviceApi';
const { RangePicker } = DatePicker;
export interface ISearchFormProps {
  onRef?: any;
  form: any;
  onSearch: any;
  onSelect: any;
  handleReset: any;
  inputs: any;
  selects: any;
  btnList: any;
  inputLists: any;
}

class SearchForm extends React.Component<ISearchFormProps, any> {
  constructor(props: ISearchFormProps) {
    super(props);
    this.state = { mode: ['date', 'date'], devCode: [] };
  }

  public componentDidMount() {
    this.setMode();
    const { inputLists } = this.props;
    inputLists.forEach((item: any) => {
      if (item.label === '设备编号') {
        this.getDevCode('');
      }
    });
  }
  private setMode() {
    let inputLists = this.props.inputLists;
    inputLists &&
      inputLists.map((item: any) => {
        if (item.type == 'range' && item.mode) {
          this.setState({ mode: [item.mode, item.mode] });
        }
      });
  }
  private onSearch(val: string) {
    this.getDevCode(val);
  }
  private onSelectChange(val: string) {
    if (!val || val == '') {
      this.getDevCode('');
    }
  }
  private getDevCode(codeAndName: string) {
    // TODO:发起异步请求,获取数据
    this.setState({ devCode: '' });
  }
  public render() {
    const { inputLists } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { devCode } = this.state;
    return (
      <div>
        <Form className="ant-advanced-search-form">
          <Row>
            {inputLists &&
              inputLists.map((item: any, index: number) => {
                if (item.type === 'input') {
                  return (
                    <Col className="search-form-item" key={index} span={6}>
                      <FormItem
                        label={item.label}
                        labelCol={{ xl: 6, xxl: 5, span: 6 }}
                        wrapperCol={{ span: 17, xxl: 15 }}
                      >
                        {getFieldDecorator(
                          `${item.keyword}`,
                          {}
                        )(<Input placeholder="请输入" />)}
                      </FormItem>
                    </Col>
                  );
                } else if (item.type === 'selects') {
                  return (
                    <Col className="search-form-item" key={index} span={6}>
                      <FormItem
                        label={item.label}
                        labelCol={{ xl: 6, xxl: 5, span: 6 }}
                        wrapperCol={{ span: 17, xxl: 15 }}
                      >
                        {getFieldDecorator(`${item.keyword}`, {
                          initialValue: item.defaultValue
                            ? item.defaultValue
                            : undefined,
                        })(
                          <Select
                            mode={item.mode}
                            showSearch={
                              item.showSearch ? item.showSearch : false
                            }
                            allowClear
                            onSearch={
                              item.label === '设备编号'
                                ? this.onSearch.bind(this)
                                : () => {}
                            }
                            optionFilterProp={
                              item.optionFilterProp
                                ? item.optionFilterProp
                                : 'value'
                            }
                            filterOption={
                              item.label === '设备编号'
                                ? false
                                : (input, option: any) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                            }
                            placeholder="请选择..."
                            onChange={
                              item.label === '设备编号'
                                ? this.onSelectChange.bind(this)
                                : () => {}
                            }
                          >
                            {item &&
                              item.label === '设备编号' &&
                              devCode &&
                              devCode.map((item: any, index: number) => {
                                return (
                                  <Option value={item.code} key={index}>
                                    {item.code}
                                  </Option>
                                );
                              })}
                            {item.label !== '设备编号' &&
                              item.options &&
                              item.options.length > 0 &&
                              item.options.map((item: any, index: number) => {
                                return (
                                  <Option
                                    value={
                                      item.val || item.val == 0
                                        ? item.val
                                        : item
                                    }
                                    key={index}
                                  >
                                    {item.name || item}
                                  </Option>
                                );
                              })}
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                  );
                } else if (item.type === 'date') {
                  return (
                    <Col className="search-form-item" key={index} span={6}>
                      <FormItem
                        label={item.label}
                        labelCol={{ xl: 6, xxl: 5, span: 6 }}
                        wrapperCol={{ span: 17, xxl: 15 }}
                      >
                        {getFieldDecorator(`${item.keyword}`, {
                          initialValue: item.defaultValue
                            ? item.defaultValue
                            : undefined,
                        })(<DatePicker style={{ width: '100%' }} />)}
                      </FormItem>
                    </Col>
                  );
                } else if (item.type === 'range') {
                  return (
                    <Col className="search-form-item" key={index} span={6}>
                      <FormItem
                        label={item.label}
                        labelCol={{ xl: 6, xxl: 5, span: 6 }}
                        wrapperCol={{ span: 17, xxl: 15 }}
                      >
                        {getFieldDecorator(`${item.keyword}`, {
                          initialValue: item.defaultValue
                            ? item.defaultValue
                            : this.state.value,
                        })(
                          <RangePicker
                            // mode={[item.mode || "date", item.mode || "date"]}
                            mode={this.state.mode}
                            style={{ width: '100%' }}
                            format={
                              item.mode == 'year'
                                ? 'YYYY'
                                : item.mode == 'month'
                                ? 'YYYY/MM'
                                : 'YYYY/MM/DD'
                            }
                            onPanelChange={(val, mode) =>
                              this.handlePanelChange(val, mode, item.keyword)
                            }
                            disabledDate={
                              item.disabled ? this.disabledDate : () => false
                            }
                            // onChange={this.handleChange}
                          />
                        )}
                      </FormItem>
                    </Col>
                  );
                } else if (item.type === 'treeSelects') {
                  return (
                    <Col className="search-form-item" key={index} span={6}>
                      <FormItem
                        label={item.label}
                        labelCol={{ xl: 6, xxl: 5, span: 6 }}
                        wrapperCol={{ span: 17, xxl: 15 }}
                      >
                        {getFieldDecorator(`${item.keyword}`, {
                          initialValue: item.defaultValue
                            ? item.defaultValue
                            : undefined,
                        })(
                          <TreeSelect
                            allowClear
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 350, overflow: 'auto' }}
                            treeData={item.options}
                            placeholder="请选择..."
                          />
                        )}
                      </FormItem>
                    </Col>
                  );
                } else if (item.type === 'dbSelects') {
                  return (
                    <Col className="search-form-item" key={index} span={6}>
                      <FormItem
                        label={item.label}
                        labelCol={{ xl: 6, xxl: 5, span: 6 }}
                        wrapperCol={{ span: 17, xxl: 15 }}
                      >
                        {getFieldDecorator(`${item.keyword}`, {
                          initialValue: item.defaultValue
                            ? item.defaultValue
                            : undefined,
                        })(
                          <Cascader
                            fieldNames={{
                              label: 'name',
                              value: 'id',
                              children: 'children',
                            }}
                            options={item.options}
                            placeholder="请选择..."
                          />
                        )}
                      </FormItem>
                    </Col>
                  );
                }
              })}
          </Row>
        </Form>
      </div>
    );
  }

  // 开始时间禁用
  private disabledDate(current: any) {
    return current && current >= moment().endOf('day');
  }

  private handleChange = (value: any) => {
    this.setState({ value });
  };
  private handlePanelChange = (value: any, mode: any, name: string) => {
    this.props.form.setFieldsValue({
      [name]: value,
    });
    this.setState({
      value,
    });
  };
}
export default SearchForm;
