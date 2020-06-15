import React, { useState, useEffect } from 'react';
// import {
//   Form,
//   Row,
//   Col,
//   Input,
//   Select,
//   TreeSelect,
//   DatePicker,
//   Cascader,
// } from 'antd';

// const FormItem = Form.Item;
// const Option = Select.Option;
// const { RangePicker } = DatePicker;

// export interface ISearchFormProps {
//   onRef?: any;
//   form: any;
//   onSearch: any;
//   onSelect: any;
//   handleReset: any;
//   inputs: any;
//   selects: any;
//   btnList: any;
//   inputLists: any;
// }

// function searchForm(props: ISearchFormProps) {
//   const [mode, setMode] = useState(['date', 'date']);
//   const [devCode, setDevCode] = useState([]);

//   const setMode_ = () => {
//     const { inputLists } = props;
//     inputLists &&
//       inputLists.forEach((item: any) => {
//         if (item.type == 'range' && item.mode) {
//           setMode([item.mode, item.mode]);
//         }
//       });
//   };
//   const getDevCode=(codeAndName: string)=> {
//     // TODO:发起异步请求,获取数据
//     setDevCode([])
//   }
//   useEffect(() => {
//     setMode_;
//     const { inputLists } = props;
//     inputLists.forEach((item: any) => {
//       if (item.label === '设备编号') {
//         getDevCode('');
//       }
//     });
//   }, []);
// }
