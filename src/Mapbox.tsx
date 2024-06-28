import mapboxgl from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import { getAllTokens } from "./shared/helpers/getAllTokens";
import { TokenDetails } from "./shared/types";
import { mapboxPopupContent } from "./shared/others/mapboxPopupContent";
import { TokensStateContext } from "./context/tokensContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

interface MapboxProps {
  height?: number;
  width?: number;
  className?: string;
}

export default ({ className }: MapboxProps) => {
  const [allTokens, setAllTokens] = useState<any[]>([]);
  const { dispatch } = useContext(TokensStateContext);

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
    dispatch({ type: "SET_TOKENS", payload: data });
    addMarkers(data);
  };

  const addMarkers = (tokens: TokenDetails[]) => {
    tokens.forEach((token) => {
      if (map.current) {
        new mapboxgl.Marker()
          .setLngLat([token.longitude, token.latitude])
          .setPopup(
            new mapboxgl.Popup({ className: "token-map-popup" })
              // .setHTML(mapboxPopupContent(token))
              .setDOMContent(mapboxPopupContent(token))
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
