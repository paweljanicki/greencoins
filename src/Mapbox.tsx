import mapboxgl from "mapbox-gl";
import { useContext, useEffect, useRef } from "react";
import { getAllTokens } from "./shared/helpers/getAllTokens";
import { TokenDetails } from "./shared/types";
import { mapboxPopupContent } from "./shared/others/mapboxPopupContent";
import { TokensStateContext } from "./context/tokensContext";
import { mapboxMarker } from "./shared/others/mapboxMarker";
import { watchTokenMarketCap } from "./shared/helpers/watchTokenMarketCap";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

interface MapboxProps {
  height?: number;
  width?: number;
  className?: string;
}

export default ({ className }: MapboxProps) => {
  const { dispatch, state } = useContext(TokensStateContext);

  const mapContainer = useRef(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const unwatchFunctions = useRef<Array<() => void>>([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current === null) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [20, 30],
      zoom: 2,
    });

    loadTokens();

    return () => {
      unwatchFunctions.current.forEach((unwatch) => unwatch());
    };
  });

  console.log("Mapbox render", state.tokens);

  const loadTokens = async () => {
    if (state.tokens.length > 0) {
      addMarkers(state.tokens);
      return;
    }

    const data = await getAllTokens();
    dispatch({ type: "SET_TOKENS", payload: data });
    addMarkers(data);
    watchTokens(data);
  };

  const onMarketCapUpdate = (
    marketCap: string,
    greenCurveAddress: string,
    passTokens: TokenDetails[]
  ) => {
    dispatch({
      type: "UPDATE_MARKET_CAP",
      payload: { greenCurveAddress, marketCap },
    });

    const marker = document.getElementById(greenCurveAddress);

    if (marker) {
      const image = marker.children[0] as HTMLImageElement;
      const currentWidth = image.width;

      const currentMarketCap = passTokens.find(
        (token) => token.greenCurveAddress === greenCurveAddress
      )?.marketCap;

      if (currentMarketCap) {
        if (parseFloat(currentMarketCap) < parseFloat(marketCap)) {
          image.width = currentWidth + 10;
          image.height = currentWidth + 10;
        } else {
          image.width = currentWidth > 40 ? currentWidth - 10 : 40;
          image.height = currentWidth > 40 ? currentWidth - 10 : 40;
        }
      }
    }
  };

  const watchTokens = async (tokens: TokenDetails[]) => {
    tokens.forEach(async (token) => {
      const unwatch = await watchTokenMarketCap({
        greenCurveAddress: token.greenCurveAddress,
        onMarketCapUpdate: (marketCap, greenCurveAddress) => {
          onMarketCapUpdate(marketCap, greenCurveAddress, tokens);
        },
      });

      unwatchFunctions.current.push(unwatch);
    });
  };

  const addMarkers = (tokens: TokenDetails[]) => {
    tokens.forEach((token) => {
      if (map.current) {
        const markerElement = mapboxMarker({
          imageHash: token.imageHash,
          greenCurveAddress: token.greenCurveAddress,
        });

        new mapboxgl.Marker({
          element: markerElement,
        })
          .setLngLat([token.longitude, token.latitude])
          .setPopup(
            new mapboxgl.Popup({ className: "token-map-popup" })
              .setDOMContent(mapboxPopupContent(token))
              .setMaxWidth("500px")
          )
          .addTo(map.current);
      }
    });
  };

  return (
    <div className={className}>
      <div ref={mapContainer} className="h-[100%]" />
      {/* <div>
        {state.tokens.map((token) => (
          <div key={token.tokenAddress}>
            <div>{token.name}</div>
            <div>{token.marketCap}</div>
            <div>{token.symbol}</div>
            <div>{token.greenCurveAddress}</div>
            <hr />
          </div>
        ))}
      </div> */}
    </div>
  );
};
