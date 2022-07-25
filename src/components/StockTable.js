import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import "../components/Table.scss";
import { Button, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";


function StockTable() {
  const [dataSource, setDataSource] = useState();
  const [inputs, setInputs] = useState([]);
  const [value, setValue] = useReducer(x => x + 1, 0);
  const [stocks, setStocks] = useState([]);

  const history = useNavigate();

  const data =inputs&& Object.keys(inputs)
    .map(function (key) {
      return inputs[key];
    });

  useEffect(() => {
    setDataSource(data)
  }, [inputs])

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://api.coinlayer.com/api/list?access_key=896df3eacbdfeaff532a8981a24d589f`)
        .then((res) => res.data.crypto)
        .then((crypto) => setInputs(crypto))

    };
    fetchHandler();
  }, []);


  useEffect(() => {
    const getStocks = async () => {
      await axios
        .get("http://localhost:5000/stocks")
        .then((res) => res.data)

        .then((data) => setStocks(data.stocks));
    }
    getStocks()
  }, [value]);


  const savedData = stocks?.map(element => (element.name))


  const onSaveData = async (record) => {
    return await axios
      .post("http://localhost:5000/stocks", {
        name: String(record.name),
        symbol: String(record.symbol),
        max_supply: Number(record.max_supply),
      })
      .then((res) => (res.statusText))
      .then(setValue())
  };



  const onviwe = () => {
    history("/view")
  }


  const columns = [

    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        //clearFilters,
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
      render: (record) => !(savedData.includes(record.name)) ?
        <a className="savebtn" onClick={() => { onSaveData(record) }}>Save</a> :
        <a className="viwebtn" onClick={() => { onviwe() }}>View Stock</a>,
        // fixed: 'right',
    },
  ];


  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={dataSource}
        scroll={{
          x: 300,
        }}
        ></Table>
      </header>
    </div>
  );
}

export default StockTable;