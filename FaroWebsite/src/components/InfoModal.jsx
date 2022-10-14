import mapMarker from "../assets/images/mapMarker.svg";
import clock from "../assets/images/clock.svg";
import phone from "../assets/images/phone.svg";
import closeIcon from "../assets/images/closeIcon.svg";

export default function InfoModal(props) {
  return (
    <>
      <ul className="bg-white flex flex-col text-black text-lg text-white absolute top-0 left-0 z-20 h-full w-[380px] p-4">
        <img
          className="w-[50px] h-[50px] right-0 top-0 pr-[inherit] pt-[inherit] absolute cursor-pointer"
          src={closeIcon}
          alt=""
          onClick={() => props.openModal(false)}
        />
        <li className="text-5xl font-extrabold mb-[-4px]">
          {props.centreName}
        </li>
        <li className="font-bold">
          {props.schoolarLevel} - {props.free ? "Público" : "Privado"}
        </li>
        <div className="w-full mt-2 mb-2.5 h-[1px] mb-2 mt-2 bg-black"></div>
        <li className="mb-1 flex text-wrap">
          <img src={mapMarker} alt="" /> {props.addressStreet}{" "}
          {props.addressNumber}
        </li>
        <li className="mb-1 flex ">
          <img className="mr-[4.5px]" src={clock} alt="" />
          {props.centreSchedules.join(", ")}
        </li>
        <li className="mb-1 flex">
          <img className="mr-[4.5px]" src={phone} alt="" />
          {props.phoneNumber}
        </li>
        <div className="w-full mt-2 mb-2 h-[1px] mb-2 mt-2 bg-black"></div>
        <h2 className="font-bold">Carreras: </h2>
        <div className="shadow-lg bg-lightGray m-2 p-2 overflow-y-scroll">
          {props.careers?.map((car) => (
            <div key={car.idCareer}>
              <li className="text-xl font-extrabold">{car.careerName}</li>
              <li className="text-xl">{car.careerDescription}</li>
              <li className="text-xl">{car.duration}</li>
            </div>
          ))}
        </div>
      </ul>
    </>
  );
}
