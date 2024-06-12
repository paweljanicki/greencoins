import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { Controller, Control } from "react-hook-form";
import NumberInput from "./NumberInput";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

interface MapboxProps {
  height?: number;
  width?: number;
  className?: string;
  control: Control<any>;
  nameLat: string;
  nameLng: string;
  setValue: any;
}

export default ({
  className,
  control,
  nameLat,
  nameLng,
  setValue,
}: MapboxProps) => {
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
        const newLng = map.current.getCenter().lng;
        const newLat = map.current.getCenter().lat;

        setPinLng(`${newLng}`);
        setPinLat(`${newLat}`);

        setValue(nameLng, `${newLng}`, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue(nameLat, `${newLat}`, {
          shouldValidate: true,
          shouldDirty: true,
        });

        marker.current?.setLngLat([newLng, newLat]);
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
          setValue(nameLng, `${lngLat.lng}`, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue(nameLat, `${lngLat.lat}`, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      });
  });

  return (
    <div className={className}>
      <div className="grid md:grid-cols-[250px_1fr] gap-4">
        <div
          ref={mapContainer}
          className="w-full h-[250px] md:w-[250px] order-2 md:order-1 mb-20 md:mb-0"
        />
        <div className="order-1 md:order-2">
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <strong>Longitude:</strong>
            <Controller
              name={nameLng}
              control={control}
              defaultValue={pinLng}
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  value={value}
                  onChange={(updatedValue) => {
                    let num = parseFloat(updatedValue);

                    if (isNaN(num)) {
                      num = 0;
                    }

                    marker.current?.setLngLat([num, parseFloat(pinLat)]);
                    map.current?.setCenter([num, parseFloat(pinLat)]);
                    setPinLng(updatedValue);
                    onChange(updatedValue);
                  }}
                  min={-180}
                  max={180}
                />
              )}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-4">
            <strong>Latitude:</strong>
            <Controller
              name={nameLat}
              control={control}
              defaultValue={pinLat}
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  value={value}
                  onChange={(updatedValue) => {
                    let num = parseFloat(updatedValue);

                    if (isNaN(num)) {
                      num = 0;
                    }

                    marker.current?.setLngLat([parseFloat(pinLng), num]);
                    map.current?.setCenter([parseFloat(pinLng), num]);
                    setPinLat(updatedValue);
                    onChange(updatedValue);
                  }}
                  min={-90}
                  max={90}
                />
              )}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
