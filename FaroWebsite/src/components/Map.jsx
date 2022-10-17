import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import InfoModal from "./InfoModal";
import logoDark from "../assets/images/logoDark.svg";
import CentreController from "../networking/controllers/Centre-Controller";
import { diffValue } from "../utils/functions";

const containerStyle = {
  height: "100%",
  zIndex: 10,
};

const center = {
  lat: -34.908812,
  lng: -56.190687,
};

function MyComponent({filterCentre, filters}) {
  const [info, setInfo] = useState(null);
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(center);
  const [markers, setMarkers] = useState(null);

  useEffect(() =>{
    const getCentresCoords = async () => {
      setMarkers(await CentreController.getCentresCoordinates())
    }
    getCentresCoords()
  },[])

  useEffect(() =>{
    if (filters){
    console.log(filters)
    const searchBy = diffValue(filters, 'all') 
    console.log(searchBy)
    if (searchBy){
      console.log(CentreController.getCentresByFilter(searchBy[0], searchBy[1]))
    }
    }
    if (filterCentre){
      console.log(filterCentre)
     setMarkers([filterCentre]) 
    }
  },[filters, filterCentre])
  

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCIfWaZPMHJaqzMX6R36zyz0-8RenAzKyo", //va en el .env
  });

  const onLoad = useCallback(async function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(async function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (clicked) => {
    async function fetchData() {
      let centre = await CentreController.getCentre(clicked.idCentre);
      setInfo(centre);
      setZoom({ lat: centre.latitude, lng: centre.longitude });
    }
    fetchData();
  };

  var myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  var myOptions = {
    styles: myStyles,
    zoom: 12,
    disableDefaultUI: true,

  };

  return isLoaded ? (
    <div className="h-full">
      {info && (
        <InfoModal
          idCentre={info.idCentre}
          centreName={info.centreName}
          free={info.free}
          addressStreet={info.addressStreet}
          addressNumber={info.addressNumber}
          schoolarLevel={info.schoolarLevel}
          centreSchedules={info.centreSchedules}
          phoneNumber={info.phoneNumber}
          careers={info.careers}
          openModal={setInfo}
        />
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        //onUnmount={onUnmount}
        center={center}
        onLoad={onLoad}
        options={myOptions}
      >
        {markers &&(
         markers.map((marker) => {
            return (
              <Marker
                icon={logoDark}
                onClick={() => handleMarkerClick(marker)}
                key={marker.idCentre}
                position={{ lat: marker.latitude, lng: marker.longitude }}
              />
            );
          }))
        }
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
