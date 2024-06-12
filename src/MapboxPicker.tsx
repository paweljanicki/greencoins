import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import NumberInput from "./NumberInput";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

interface MapboxProps {
  height?: number;
  width?: number;
  className?: string;
}

export default ({ className }: MapboxProps) => {
  const mapContainer = useRef(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const marker = useRef<null | mapboxgl.Marker>(null);
  const [pinLat, setPinLat] = useState<string>("0");
  const [pinLng, setPinLng] = useState<string>("0");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current === null) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0],
      zoom: 1,
    });

    map.current.on("move", () => {
      if (map.current !== null) {
        setPinLng(`${map.current.getCenter().lng}`);
        setPinLat(`${map.current.getCenter().lat}`);

        marker.current?.setLngLat([
          map.current.getCenter().lng,
          map.current.getCenter().lat,
        ]);
      }
    });

    marker.current = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([parseFloat(pinLng), parseFloat(pinLat)])
      .addTo(map.current)
      .on("dragend", () => {
        const lngLat = marker.current?.getLngLat();
        if (lngLat) {
          setPinLng(`${lngLat.lng}`);
          setPinLat(`${lngLat.lat}`);
        }
      });
  });

  return (
    <div className={className}>
      <div className="grid grid-cols-[250px_1fr] gap-4">
        <div ref={mapContainer} className="h-[250px] w-[250px]" />
        <div>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <strong>Longitude:</strong>
            <NumberInput
              value={pinLng}
              onChange={(value) => {
                let num = parseFloat(value);

                if (isNaN(num)) {
                  num = 0;
                }

                marker.current?.setLngLat([num, parseFloat(pinLat)]);
                map.current?.setCenter([num, parseFloat(pinLat)]);
                setPinLng(value);
              }}
              min={-180}
              max={180}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            <strong>Latitude:</strong>
            <NumberInput
              value={pinLat}
              onChange={(value) => {
                let num = parseFloat(value);

                if (isNaN(num)) {
                  num = 0;
                }

                marker.current?.setLngLat([parseFloat(pinLng), num]);
                map.current?.setCenter([parseFloat(pinLng), num]);
                setPinLat(value);
              }}
              min={-90}
              max={90}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
