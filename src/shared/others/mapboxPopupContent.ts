import { getIpfsLink } from "../helpers/getIpfsLink";
import { Token } from "../types";

export const mapboxPopupContent = (token: Token) => {
  return `
    <div class="popup-content w-full grid md:grid-cols-[200px_1fr] gap-4">
      <div class="col-span-1">
        <img src="${getIpfsLink(token.metadata.imageHash)}" alt="Token image" class="w-[200px] h-[200px]" />
      </div>
      <div class="col-span-1 flex flex-col">
        <span class="text-sm text-accent">market cap: $${token.metadata.marketCap || ""}</span>
        <span class="text-xs text-neutral-content tracking-wide">ticker: <span class="font-bold">${token.metadata.ticker}</span></span>
        <h4 class="text-xl font-bold mr-6">${token.metadata.name}</h4>
        <p class="text-sm text-neutral-content overflow-hidden text-ellipsis max-h-[80px] line-clamp-4">${token.metadata.description || ""}</p>
        <button class="button-shadow rounded-md bg-primary text-primary-content text-lg py-1 px-4 self-end mt-auto">
          [more]
        </button>
      </div>
    </div>
  `;
};
