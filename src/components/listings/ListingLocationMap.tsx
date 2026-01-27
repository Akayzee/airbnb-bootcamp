"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Map, { MapRef, Marker } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  lng: number | null;
  lat: number | null;
};

const ListingLocationMap = ({ lat, lng }: Props) => {
  const mapRef = useRef<MapRef>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  //   useEffect(() => {
  //     if (!mapContainerRef.current) return;

  //     mapboxgl.accessToken =
  //       "pk.eyJ1IjoiYWtpbmxhd29uIiwiYSI6ImNrN3VxNnRzaDEzYWozbXNmYjFtNHYycmIifQ.AWVSyRhv1vFTrIYp0jYfnQ";

  //     const map = new mapboxgl.Map({
  //       container: mapContainerRef.current,
  //       style: "mapbox://styles/mapbox/streets-v12",
  //       center: [-74.5, 40], // starting position [lng, lat]
  //       zoom: 9, // starting zoom
  //     });
  //     const marker = new mapboxgl.Marker({
  //       color: "#F84C4C", // color it red
  //     });
  //     if (lat && lng) {
  //       marker.setLngLat([lng, lat]);
  //       console.log(marker.getLngLat());
  //     }

  //     mapRef.current = map;

  //     return () => {
  //       map.remove();
  //     };
  //   }, [lat, lng]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    if (lat && lng) {
      map.setCenter([lng, lat]);
    }
  }, [lat, lng]);
  return (
    <div>
      <p className="text-xl font-semibold mb-6">Where you will stay </p>
      <div className="rounded-lg">
        {lng && lat && (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
            initialViewState={{
              longitude: lng,
              latitude: lat,
              zoom: 10,
            }}
            style={{ width: "100%", height: 500, borderRadius: "10px" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            maxZoom={10}
          >
            <Marker
              longitude={lng}
              latitude={lat}
              anchor="bottom"
              color="#FF0000"
            />
          </Map>
        )}
      </div>
    </div>
  );
};

export default ListingLocationMap;
