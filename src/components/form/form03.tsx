import React, { useState, useEffect, useRef } from 'react';
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
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
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

function SearchForm(props: ISearchFormProps) {
  const [mode, setMode] = useState<any>(['date', 'date']);
  const [devCode, setDevCode] = useState([]);
  const [value, setValue] = useState<any>();

  const setMode_ = () => {
    const { inputLists } = props;
    inputLists &&
      inputLists.forEach((item: any) => {
        if (item.type == 'range' && item.mode) {
          setMode([item.mode, item.mode]);
        }
      });
  };
  const getDevCode = (codeAndName: string) => {
    // TODO:发起异步请求,获取数据
    setDevCode([]);
  };

  const onSearch = (val: string) => {
    getDevCode(val);
  };
  const onSelectChange = (val: string) => {
    if (!val || val == '') {
      getDevCode('');
    }
  };
  // 开始时间禁用
  const disabledDate = (current: any) => {
    return current && current >= moment().endOf('day');
  };

  const handleChange = (value: any) => {
    setValue(value);
  };
  const handlePanelChange = (value: any, mode: any, name: string) => {
    props.form.setFieldsValue({
      [name]: value,
    });
    setValue(value);
  };

  useEffect(() => {
    setMode_();
    const { inputLists } = props;
    inputLists.forEach((item: any) => {
      if (item.label === '设备编号') {
        getDevCode('');
      }
    });
  }, []);

  const { inputLists } = props;
  const { getFieldDecorator } = props.form;

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
                          showSearch={item.showSearch ? item.showSearch : false}
                          allowClear
                          onSearch={
                            item.label === '设备编号' ? onSearch : () => {}
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
                              ? onSelectChange
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
                                    item.val || item.val == 0 ? item.val : item
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
                          : value,
                      })(
                        <RangePicker
                          // mode={[item.mode || "date", item.mode || "date"]}
                          mode={mode}
                          style={{ width: '100%' }}
                          format={
                            item.mode == 'year'
                              ? 'YYYY'
                              : item.mode == 'month'
                              ? 'YYYY/MM'
                              : 'YYYY/MM/DD'
                          }
                          onPanelChange={(val, mode) =>
                            handlePanelChange(val, mode, item.keyword)
                          }
                          disabledDate={
                            item.disabled ? disabledDate : () => false
                          }
                          // onChange={handleChange}
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

export default function searchFormShow() {
  const myRef = useRef();
  const inputLists = [
    { label: '车牌号', keyword: 'licensePlateNumber', type: 'input' },
    {
      label: '驾驶员',
      keyword: 'driverId',
      showSearch: true,
      optionFilterProp: 'children',
      type: 'selects',
      options: [
        {
          id: 6,
          name: '熊志鑫',
          gender: 0,
          birthday: 1577168763000,
          drivingLicenseType: 6,
          phoneNumber: '18010636955',
          createBy: '239',
          updateBy: '239',
          createAt: 1577168765240,
          updateAt: 1577168765240,
          delFlag: 0,
          createName: '济宁设备管理员',
          updateName: '济宁设备管理员',
          val: 6,
        },
        {
          id: 9,
          name: 'suga',
          gender: 1,
          birthday: 1586746157000,
          drivingLicenseType: 1,
          phoneNumber: '15623123654',
          createBy: '259',
          updateBy: '259',
          createAt: 1586746161564,
          updateAt: 1586746180287,
          delFlag: 0,
          createName: '制水设备管理员',
          updateName: '制水设备管理员',
          val: 9,
        },
        {
          id: 10,
          name: 'q',
          gender: 1,
          birthday: 1587457795000,
          drivingLicenseType: 1,
          phoneNumber: '13456789024',
          createBy: '340',
          updateBy: '340',
          createAt: 1587457818929,
          updateAt: 1587457818929,
          delFlag: 0,
          createName: 'ly416',
          updateName: 'ly416',
          val: 10,
        },
        {
          id: 11,
          name: 'bts',
          gender: 0,
          birthday: 1587459410000,
          drivingLicenseType: 1,
          phoneNumber: '15000000000',
          createBy: '340',
          updateBy: '340',
          createAt: 1587459415592,
          updateAt: 1587459415592,
          delFlag: 0,
          createName: 'ly416',
          updateName: 'ly416',
          val: 11,
        },
        {
          id: 12,
          name: 'string',
          gender: 0,
          birthday: 1587459861000,
          drivingLicenseType: 0,
          phoneNumber: 'string',
          createBy: '259',
          updateBy: '259',
          createAt: 1587461881940,
          updateAt: 1587461881940,
          delFlag: 0,
          createName: '制水设备管理员',
          updateName: '制水设备管理员',
          val: 12,
        },
      ],
    },
    { label: '事故时间', keyword: 'createAt', type: 'range' },
  ];
  const inputListsBase = [
    { label: '车牌号', keyword: 'licensePlateNumber', type: 'input' },
    {
      label: '驾驶员',
      keyword: 'driverId',
      showSearch: true,
      optionFilterProp: 'children',
      type: 'selects',
    },
    { label: '事故时间', keyword: 'createAt', type: 'range' },
  ];

  return <SearchForm inputLists={inputLists} ref={myRef}></SearchForm>;
}
