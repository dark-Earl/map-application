<template>
  <div>
    <div>
      <a-divider>行业板块资金情况</a-divider>
      <a-table :columns="columns" :data-source="data" @change="onChange" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
const columns = [
  {
    title: '板块名称',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
    ],
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: '主力流入',
    dataIndex: 'inflow',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
export default defineComponent({
  setup() {
    const onChange = (pagination, filters, sorter) => {
      console.log('params', pagination, filters, sorter);
    };
    return {
      data,
      columns,
      onChange,
    };
  },
});
</script>
