import { router } from "../../main";
import { getIpfsLink } from "../helpers/getIpfsLink";
import { TokenDetails } from "../types";

export const mapboxPopupContent = (token: TokenDetails) => {
  const container = document.createElement("div");
  container.className =
    "popup-content w-full grid md:grid-cols-[200px_1fr] gap-4";

  const imageContainer = document.createElement("div");
  imageContainer.className = "col-span-1";

  const img = document.createElement("img");
  img.src = getIpfsLink(token.imageHash);
  img.alt = "Token image";
  img.className = "w-[200px] h-[200px]";

  imageContainer.appendChild(img);

  const infoContainer = document.createElement("div");
  infoContainer.className = "col-span-1 flex flex-col";

  const marketCapSpan = document.createElement("span");
  marketCapSpan.className = "text-sm text-accent";
  marketCapSpan.textContent = `market cap: $${token.marketCap || ""}`;

  const tickerSpan = document.createElement("span");
  tickerSpan.className = "text-xs text-neutral-content tracking-wide";
  tickerSpan.innerHTML = `ticker: <span class="font-bold">${token.symbol}</span>`;

  const titleH4 = document.createElement("h4");
  titleH4.className = "text-xl font-bold mr-6";
  titleH4.textContent = token.name;

  const descriptionP = document.createElement("p");
  descriptionP.className =
    "text-sm text-neutral-content overflow-hidden text-ellipsis max-h-[80px] line-clamp-4";
  descriptionP.textContent = token.description || "";

  const button = document.createElement("button");
  button.className =
    "open-token-details button-shadow rounded-md bg-primary text-primary-content text-lg py-1 px-4 self-end mt-auto";
  button.id = token.tokenAddress;
  button.textContent = "[more]";

  button.addEventListener("click", () => {
    router.navigate(`/token/${token.tokenAddress}`);
  });

  infoContainer.appendChild(marketCapSpan);
  infoContainer.appendChild(tickerSpan);
  infoContainer.appendChild(titleH4);
  infoContainer.appendChild(descriptionP);
  infoContainer.appendChild(button);

  container.appendChild(imageContainer);
  container.appendChild(infoContainer);

  return container;
};
