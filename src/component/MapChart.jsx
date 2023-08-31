import React from "react";
import "./MapChart.css"

const MapChart = ({src}) => {
  return (
    <div class="globe">  
    <div class="go"> <img src={src}/></div>
   </div>
  );
};

export default MapChart;
