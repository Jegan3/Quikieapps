/*eslint-disable*/
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Button, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../components/Table.scss";
import Card from "./Card"
import "./Home.scss"

const View = () => {

  const [stocks, setStocks] = useState([]);
  const [value, setValue] = useReducer(x => x + 1, 0);

  const URL = "http://localhost:5000/stocks";
  const getStocks = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

  useEffect(() => {
    getStocks().then((data) => setStocks(data.stocks));
  }, [value]);

  const onDelete = async (record) => {
    await axios
      .delete(`http://localhost:5000/stocks/${record._id}`)
      .then((res) => res.data)
      .then(setValue())
  };

  const columns = [

    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
            // onPressEnter={() => {
            //   confirm();
            // }}
            // onBlur={() => {
            //   confirm();
            // }}
            ></Input>
            {/* <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button> */}
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "2",
      title: "SYMBOL",
      dataIndex: "symbol",
    },
    {
      key: "3",
      title: "MAX_SUPPLY",
      dataIndex: "max_supply",
    },
    {
      key: "4",
      title: "Actions",
      render: (record) => <a className="deletebtn" onClick={() => { onDelete(record) }}>Delete</a>
    },
  ];


  return (
    <div>
      <div>
        <Card />
      </div>
      <div className="table-box">
        <Table columns={columns} dataSource={stocks} />
      </div>
    </div>

  );
};

export default View;