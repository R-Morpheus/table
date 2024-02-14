import React, { useState } from 'react';
import {Layout, Menu, Modal, Input, Button, Tag} from 'antd';
import { format } from 'date-fns';
import {DataType, Options} from "./config/types/types.ts";
import products from './config/data/products.json';
import pricePlans from './config/data/pricePlans.json';
import pages from './config/data/pages.json';
import Portal from "./Portal";
import Table from "./Table.tsx";
import styles from "./App.module.css";

const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: 'Products' },
  { key: '2', label: 'Price Plans' },
  { key: '3', label: 'Pages' },
]
const getColumns = <T extends DataType>(data: T[]) => {
  if (!data.length) return [];

  return Object.keys(data[0]).map(key => {
    const typedKey = key as keyof T;

    if (key === 'options') {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        render: (options: Options | undefined) => options ? `${options.size}, ${options.amount}` : 'N/A',
      };
    }
    if (typeof data[0][typedKey] === 'boolean') {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        render: (value: boolean) => (
          <Tag color={value ? 'green' : 'red'}>{value ? 'Active' : 'Inactive'}</Tag>
        ),
      };
    } else if (key.toLowerCase().includes('date') || key.toLowerCase().includes('at')) {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        render: (value: string) => format(new Date(value), 'PPP'),
      };
    }
    return {
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
    };
  });
};

const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('1');
  const [activeData, setActiveData] = useState<DataType[]>(products);

  const [editingItem, setEditingItem] = useState<DataType | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


  const showEditModal = (item: DataType) => {
    setEditingItem(item);
    setIsModalVisible(true);

    if ('name' in item) {
      setEditValue(item.name);
    } else if ('description' in item) {
      setEditValue(item.description);
    } else if ('title' in item) {
      setEditValue(item.title);
    } else {
      setEditValue('');
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (editingItem && editValue) {
      const newData = activeData.map((item) => {
        if (item.id === editingItem.id) {
          if ('description' in editingItem) {
            return { ...item, description: editValue };
          } else if ('name' in editingItem) {
            return { ...item, name: editValue };
          } else if ('title' in editingItem) {
            return { ...item, title: editValue };
          }
        }
        return item;
      });

      setActiveData(newData);
    }
    setEditingItem(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
    setEditValue('');
  };
  const actionColumn = {
    title: 'Action',
    key: 'action',
    render: (_: unknown, record: DataType) => (
      <Button onClick={() => showEditModal(record)}>Edit</Button>
    ),
  };
  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case '1':
        setActiveData(products);
        break;
      case '2':
        setActiveData(pricePlans);
        break;
      case '3':
        setActiveData(pages);
        break;
      default:
        setActiveData(products);
    }
  };

  const columns = React.useMemo(() => [...getColumns(activeData), actionColumn], [activeData]);

  return (
    <Layout>
      <Header className={styles.header}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={items}
          className={styles.menu}
        />
      </Header>
      <Content className={styles.content}>
        <div className={styles.table}>
          <Table data={activeData} columns={columns}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by
        <a href={'https://github.com/R-Morpheus'} target={"_blank"}> R-Morpheus</a>
      </Footer>
      <Portal>
        <Modal title="Edit" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            allowClear
          />
        </Modal>
      </Portal>
    </Layout>
  );
};

export default App;
