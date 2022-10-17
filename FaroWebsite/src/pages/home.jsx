import React, { useState } from "react";
import FilterForm from "../components/FilterForm";
import Map from "../components/Map";
import NavBar from "../components/NavBar";

 const Home = () => {
  const [filterData, setFilterData] = useState();
  const [filterCentre, setFilterCentre] = useState();

const handleFilterData = (data) => {
  setFilterData(data)
}
const handleFilterCentre = (centre) => {
  setFilterCentre(centre)
}

  return (
    <div className="h-screen">
      <NavBar/>
      <div className="flex h-[92vh] min-h-sm overflow-x-hidden">
        <div className="w-full h-full">
          <Map filterCentre={filterCentre} filters={filterData}/>
        </div>
        <FilterForm filterCentre={handleFilterCentre} filterData={handleFilterData}/>
      </div>
    </div>
  );
}

export default Home;
