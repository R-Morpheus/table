import { useState} from 'react';
import { Table as AntTable, Input } from 'antd';
import {DataType} from "./config/types/types.ts";
import {ColumnsType} from "antd/es/table";
import { SearchOutlined } from '@ant-design/icons';

interface TableProps {
  data: DataType[];
  columns: ColumnsType<DataType> | undefined;
}

function Table({ data, columns }: TableProps) {
  const [filterValue, setFilterValue] = useState('');

  const filteredData = data.filter(item => {
    return Object.values(item).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
      return false;
    });
  });

  return (
    <>
      <Input
        placeholder="Search..."
        value={filterValue}
        onChange={e => setFilterValue(e.target.value)}
        style={{ width: 200, marginBottom: 16 }}
        suffix={<SearchOutlined />}
        allowClear
      />
      <AntTable dataSource={filteredData} columns={columns} rowKey="id" />
    </>
  );
}

export default Table;
