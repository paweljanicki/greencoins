import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { getAllTokens } from "./shared/helpers/getAllTokens";
import { Token } from "./shared/types";
import TokenPopup from "./TokenPopup";
import { mapboxPopupContent } from "./shared/others/mapboxPopupContent";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

interface MapboxProps {
  height?: number;
  width?: number;
  className?: string;
}

export default ({ className }: MapboxProps) => {
  const [allTokens, setAllTokens] = useState<any[]>([]);

  const mapContainer = useRef(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const [lng, setLng] = useState<number | string>(20);
  const [lat, setLat] = useState<number | string>(30);
  const [zoom, setZoom] = useState<number | string>(2);

  console.log("allTokens", allTokens);

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

    loadTokens();
  });

  const loadTokens = async () => {
    const data = await getAllTokens();
    setAllTokens(data);
    addMarkers(data);
  };

  const addMarkers = (tokens: Token[]) => {
    tokens.forEach((token) => {
      if (map.current) {
        new mapboxgl.Marker()
          .setLngLat([token.metadata.longitude, token.metadata.latitude])
          .setPopup(
            new mapboxgl.Popup({ className: "token-map-popup" })
              .setHTML(mapboxPopupContent(token))
              .setMaxWidth("500px")
          )
          .addTo(map.current);
      }
    });
  };

  return (
    <div className={className}>
      <div ref={mapContainer} className="h-full" />
    </div>
  );
};
