import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import SearchBar from "./SearchBar";
import CareerController from "../networking/controllers/Career-Controller";
import CustomSelect from "../components/CustomSelect";

export default function FilterForm(props) {
  const [careersFormikOp, setCareersFormikOp] = useState([{}]);

  const formik = useFormik({
    initialValues: {
      selectedCareer: {},
      schedule: "",
      career: {},
      free: null,
    },
    onSubmit: (values) => {},
  });

  const schoolarLevel = [
    { value: "any", label: "Cualquiera" },
    { value: "Bachillerato", label: "Bachillerato" },
    { value: "Universitario", label: "Universitario" },
  ];

  const centreSchedule = [
    { value: "any", label: "Cualquiera" },
    { value: "Vespertino", label: "Vespertino" },
    { value: "Matutino", label: "Matutino" },
    { value: "Nocturno", label: "Nocturno" },
    { value: "Horario completo", label: "Horario completo" },
  ];

  const freeOptions = [
    { value: "any", label: "Cualquiera" },
    { value: false, label: "Privado" },
    { value: true, label: "Público" },
  ];

  useEffect(() => {
    const getCareers = async (value) => {
      setCareersFormikOp(
        /*{
          value: "any",
          label: "Cualquiera",
        } +*/
        (await CareerController.getAllCareers()).map((car) => ({
          value: car.idCareer,
          label: car.careerName,
        }))
      );
      /*
      setCareersFormikOp(
        (await CareerController.getAllCareers()).map((car) => ({
          value: car.idCareer,
          label: car.careerName,
        }))
      );*/
    };
    getCareers();
  }, [careersFormikOp]);

  const careersOptions = [
    { value: "any", label: "Cualquiera" },
    ...careersFormikOp,
  ];

  return (
    <>
      <div className="flex flex-col h-[92vh] w-[400px] bg-firstBg text-white">
        <h1 className="mt-8 flex justify-center text-3xl">Filtrar</h1>
        <SearchBar centres={props.centres} setSearch={props.setCentres} />
        <form className="flex items-center flex-col" action="">
          <div className="w-4/5 flex flex-col">
            <label className="text-base font-normal mb-2" htmlFor="free">
              Privado/Publico
            </label>
            <CustomSelect
              name={"free"}
              options={freeOptions}
              value={formik.values.free}
              onChange={(value) => formik.setFieldValue("free", value.value)}
              placeholder={"Horario"}
            />
          </div>
          <div className="w-4/5 flex flex-col mt-6">
            <label
              className="text-base font-normal mb-2"
              htmlFor="centreSchedule"
            >
              Horarios
            </label>
            <CustomSelect
              defaultValue="no select"
              name={"centreSchedule"}
              options={centreSchedule}
              value={formik.values.centreSchedule}
              onChange={(value) =>
                formik.setFieldValue("centreSchedule", value)
              }
              placeholder={"Horarios"}
            />
          </div>
          <div className="w-4/5 flex flex-col mt-6">
            <label className="text-base font-normal mb-2" htmlFor="free">
              Carreras
            </label>
            <CustomSelect
              name={"SelectedCareer"}
              options={careersOptions}
              value={formik.values.selectedCareer}
              onChange={(value) =>
                formik.setFieldValue("SelectedCareer", value.value)
              }
              placeholder={"Carreras"}
              className="text-white"
            />
          </div>
          <div className="w-4/5 flex flex-col mt-6">
            <label
              className="text-base font-normal mb-2"
              htmlFor="schoolarLevel"
            >
              Nivel Escolar
            </label>
            <CustomSelect
              name={"schoolarLevel"}
              options={schoolarLevel}
              value={formik.values.schoolarLevel}
              onChange={(value) =>
                formik.setFieldValue("schoolarLevel", value.value)
              }
              placeholder={"Nivel escolar"}
            />
          </div>
        </form>
      </div>
    </>
  );
}
