import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { getCentresName } from "../api/api";

const SearchButton = ({ placeholder }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [showCentres, setShowCentres] = useState(false)

  useEffect(() => {
   getCentresName()
   .then((response) => {
      setData(response.map((item) => 
        item.centre_name))
   });
  }, []);

  const results = !search
    ? data
    : data?.filter((dato) =>
        dato?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setShowCentres(true)
    console.log(data)
  };

  const hiddeCentres = (item) => {
    setSearch(item)
    setShowCentres(false)
    //hacer metodo a la api que me traiga los valores del centro que selecciono el administrador
  }

  return (
    <div className="dropdown flex w-full h-11 bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between">
      <input
        value={search}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full h-full pl-4 bg-secondBg"
      />
       {data?.length > 0 && (
        <ChevronDownIcon
          className="w-6 cursor-pointer text-firstColor mr-2"
          onClick={() => setShowCentres(!showCentres)}
        />
      )}
      {(showCentres) && (
        <div className="w-full bg-blackOpacity z-10 dropdown-content">
          {results.map((item) => (
            <div className="flex justify-between hoverBg" key={item}>
              <p className="py-1 pl-2" key={item} onClick={() => hiddeCentres(item)}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchButton;
