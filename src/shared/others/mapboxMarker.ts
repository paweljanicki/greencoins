import { getIpfsLink } from "../helpers/getIpfsLink";

export const mapboxMarker = ({
  imageHash,
  greenCurveAddress,
}: {
  imageHash: string;
  greenCurveAddress: string;
}) => {
  const markerElement = document.createElement("div");
  markerElement.className = "custom-marker bg-primary rounded-full";
  markerElement.id = greenCurveAddress;

  const image = document.createElement("img");
  image.src = getIpfsLink(imageHash);
  image.alt = "Token image";
  image.className = "rounded-full custom-marker__image";
  image.width = 40;
  image.height = 40;

  markerElement.appendChild(image);

  return markerElement;
};
