import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

interface MapboxProps {
  height?: number;
  width?: number;
  className?: string;
}

export default ({ className }: MapboxProps) => {
  const mapContainer = useRef(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const [lng, setLng] = useState<number | string>(20);
  const [lat, setLat] = useState<number | string>(30);
  const [zoom, setZoom] = useState<number | string>(2);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current === null) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [
        typeof lng === "string" ? parseInt(lng, 10) : lng,
        typeof lat === "string" ? parseInt(lat, 10) : lat,
      ],
      zoom: typeof zoom === "string" ? parseInt(zoom, 10) : zoom,
    });

    map.current.on("move", () => {
      if (map.current !== null) {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      }
    });
  });

  return (
    <div className={className}>
      <div ref={mapContainer} className="h-full" />
    </div>
  );
};
