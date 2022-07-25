/*eslint-disable*/
import React from "react";
import StockTable from "./StockTable";
import Card from "./Card"
import "./Home.scss"

const Home = () => {
  return (
    <div>
      <div>
        <Card />
      </div>
      <div className="table-box">
        <StockTable />
      </div>
    </div>

  );
};

export default Home;
