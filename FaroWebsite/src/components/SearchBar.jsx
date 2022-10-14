import React, { useState, useEffect, useRef } from "react";
import Search from "../assets/images/search.svg";
import { useFormik } from "formik";
import CentreController from "../networking/controllers/Centre-Controller";
import CustomSelect from "../components/CustomSelect";

export default function SearchBar(props) {
  const [selectedCentre, setSelectedCentre] = useState(0);
  const [centresOptions, setCentresOptions] = useState([{}]);
  const [search, setSearch] = useState(props.search);

  const didMountRef = useRef(false);

  //className ="w-[290px] pb-2 text-white pl-8 border-b-2 border-firstColor .placeholder-grayColorPlaceHolder placeholder:relative placeholder:bottom-[-1.1px] placeholder:tracking-wide bg-transparent ";

  useEffect(() => {
    const getCentres = async () => {
      setCentresOptions(
        (await CentreController.getCentreCoordinates()).map((cen) => ({
          value: cen.idCentre,
          label: cen.centreName,
        }))
      );
    };
    getCentres();
  }, [props.centres]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      const getCentres = async () => {
        setSearch([await CentreController.getCentre(selectedCentre.value)]);
      };
      getCentres();
    }
  }, [selectedCentre]);

  return (
    <>
      <div className="mt-16 mb-14 ">
        <CustomSelect
          options={centresOptions}
          className="m-16"
          onChange={(value) => setSelectedCentre(value)}
          value={selectedCentre}
        />
        {/*
        <img
          src={Search}
          alt=""
          className=" w-5 h-6 bottom-[1px] left-[24px] relative padding"
        />
        <input
          className="w-[290px] pb-2 text-white pl-8 border-b-2 border-firstColor .placeholder-grayColorPlaceHolder placeholder:relative placeholder:bottom-[-1.1px] placeholder:tracking-wide bg-transparent "
          name="centreName"
          placeholder="Buscar institución"
          options={careers}
          onChange={(e) => getCentreByName(e.target.value)}
          type="text"
        />*/}
      </div>
    </>
  );
}
