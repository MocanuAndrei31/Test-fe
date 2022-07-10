import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../images/logo.png";

import "./Dashboard.scss";
import Graph from "./Components/Graph";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState();
  const [stockData, setStockData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getData = async () => {
    await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York"
    )
      .then((response) => response.json())
      .then((res) => {
        setWeatherData(res);
      });
  };
  useEffect(() => {
    getData();
    getStock();
  }, []);
  const getStock = async () => {
    await fetch(
      "http://api.marketstack.com/v1/eod/latest?access_key=ca1277cfa153a8525e4f1eb1012f4993&symbols=AAPL,MSFT,GOOG,AMZN"
    )
      .then((response) => response.json())
      .then((res) => {
        setStockData(res.data);
      });
  };
  console.log("STOCK", stockData);
  return (
    <div className="main-container">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <div className="header">
        <div className="menu-headline">
          <MenuIcon
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <h5 className="h5-headline">WIDGETS</h5>
        </div>
        <div className="logo">
          <img src={Logo} alt="Letter N" />
        </div>
        <div className="interactive">
          <SearchIcon fontSize="medium" />
          <Avatar />
          <BookmarkBorderIcon fontSize="medium" />
        </div>
      </div>
      <div className="weather-big-image-container">
        <div className="big-image-container">
          <div className="wrapper">
            <h2>Astronauts could land on Red Planet by 2039</h2>
            <div className="row-container">
              <div className="row">
                <GraphicEqIcon />
                <a
                  rel="noreferrer"
                  href="https://www.space.com/"
                  target="_blank"
                >
                  SPACE.com
                </a>

                <AccessTimeIcon />
                <h5>20m ago</h5>
              </div>
              <div className="flex-end">
                <h5>SCIENCE</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-container">
          <div className="col-container">
            <div className="col-weather">
              <CloudQueueIcon color="inherit" fontSize="inherit" />
              <h2>Mostly Cloudy</h2>
              <h3>New York</h3>
            </div>
            <div className="col-temperature">
              <div className="menu">
                <h5>Today</h5>
                <h5>Tomorrow</h5>
                <h5>Week</h5>
              </div>
              <h2>
                {weatherData &&
                  weatherData.daily.temperature_2m_max[0].toFixed(0)}{" "}
                {weatherData && weatherData.daily_units.temperature_2m_max}
              </h2>
            </div>
          </div>
          <div className="temperature-row-container">
            <div className="temp-row">
              {weatherData &&
                weatherData.hourly.temperature_2m
                  .splice(0, 8)
                  .map((temp, i) => (
                    <h2 key={i}>
                      {temp.toFixed(0)}
                      {weatherData.daily_units.temperature_2m_max.slice(0, 1)}
                    </h2>
                  ))}
            </div>
            <div className="time-row">
              {weatherData &&
                weatherData.hourly.time
                  .splice(0, 8)
                  .map((time, i) => <h2 key={i}>{time.slice(11, 16)}</h2>)}
            </div>
          </div>
        </div>
      </div>
      <div className="graph-container">
        <div className="stock">
          {stockData &&
            stockData.splice(0, 4).map((el, i) => (
              <div className="stock-tab" key={i}>
                <h2>{el.symbol}</h2>
                <h3>{el.adj_close}</h3>
              </div>
            ))}
        </div>
        <div className="graph">{/* <Graph data={stockData} /> */}</div>
      </div>
    </div>
  );
};

export default Dashboard;
