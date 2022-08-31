import Image from "next/image";
import Geocode from "react-geocode";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import styles from "@/styles/Mapbox.module.css";

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    // width: 500,
    // height: 500,
    zoom: 12,
  });

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.attributes.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (loading) return false;

  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onMove={(vp) => setViewport(vp)}
      // className={styles}
    >
      {/* <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" /> */}
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src="/pin5.svg" width={30} height={30} />
      </Marker>
    </Map>
  );
}
