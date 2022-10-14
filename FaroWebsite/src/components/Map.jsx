import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import InfoModal from "./InfoModal";
import logoDark from "../assets/images/logoDark.svg";
import CentreController from "../networking/controllers/Centre-Controller";

const containerStyle = {
  height: "92vh",
  zIndex: 10,
};

const center = {
  lat: -34.908812,
  lng: -56.190687,
};

function MyComponent(props) {
  const [info, setInfo] = useState(null);
  const [map, setMap] = React.useState(null);
  const [zoom, setZoom] = React.useState(center);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCIfWaZPMHJaqzMX6R36zyz0-8RenAzKyo",
  });

  const onLoad = React.useCallback(async function callback(map) {
    console.log("executed");
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(async function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (clicked) => {
    async function fetchData() {
      // You can await here
      let centre = await CentreController.getCentre(clicked.idCentre);
      setInfo(centre); // ...
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
  };

  return isLoaded ? (
    <div className="h-full relative">
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
        onLoad={onLoad}
        options={myOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {props.markers.length > 0 &&
          props.markers.map((marker) => {
            return (
              <Marker
                icon={logoDark}
                onClick={() => handleMarkerClick(marker)}
                key={marker.idCentre}
                position={{ lat: marker.latitude, lng: marker.longitude }}
              />
            );
          })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
