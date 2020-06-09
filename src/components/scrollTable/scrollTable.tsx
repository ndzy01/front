import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';

export default function VirtualTable(props: any) {
  const gridRef: any = useRef();
  // 获取 props 的内容
  const { columns, scroll, className } = props;
  // table 宽度
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({ width }: any) => !width).length;
  const mergedColumns = columns.map((column: any) => {
    if (column.width) {
      return column;
    }
    return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
  });

  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const resetVirtualGrid = () => {
    if (gridRef.current) {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false,
      });
    }
    // console.log(gridRef.current)
  };

  useEffect(() => resetVirtualGrid, []);
  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (
    rawData: any,
    { scrollbarSize, ref, onScroll }: any
  ) => {
    console.log(ref);
    ref.current = connectObject;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last':
                columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        style={{ width: '1100px' }}
        {...props}
        className={classNames(className, 'virtual-table')}
        columns={mergedColumns}
        rowKey={(record: any) => record.id}
        pagination={false}
        rowClassName={(record: any, index: number) => {
          console.log(record.isPass);
          if (record.isPass) {
            return record.isPass == '0' ? '' : 'table-prompt-row';
          } else {
            return null;
          }
        }}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
}
