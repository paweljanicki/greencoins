import { CreateToken, TokenMetadata } from "../types";
import { FleekSdk, ApplicationAccessTokenService } from "@fleek-platform/sdk";
import { createJsonFile } from "./createJsonFile";
import { greenLaunchpad } from "../../abi/GreenLaunchpad";
import { config } from "../../wagmi";
import { simulateContract, writeContract } from "@wagmi/core";

const applicationService = new ApplicationAccessTokenService({
  clientId: import.meta.env.VITE_FLEEK_CLIENT_ID,
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService,
});

export const deployToken = async (createToken: CreateToken) => {
  const symbol = createToken.ticker.toUpperCase();
  const metadata = await getTokenMetadata(createToken);
  const metadataHash = await getTokenMetadataHash(metadata, symbol);

  console.log("metadata", metadata);
  console.log("metadataHash", metadataHash);

  const hash = await deployTokenViaContract(createToken, metadataHash);

  return hash;
};

const getTokenMetadataHash = async (
  metadata: TokenMetadata,
  symbol: string
): Promise<string> => {
  // Upload metadata to IPFS

  const metadataFile = createJsonFile(metadata, symbol);

  const metadataResponse = await fleekSdk.storage().uploadFile({
    file: metadataFile,
  });

  console.log("metadataResponse", metadataResponse.pin.cid);

  return metadataResponse.pin.cid;
};

const getTokenMetadata = async (token: CreateToken): Promise<TokenMetadata> => {
  const { description, file, lat, lng } = token;
  const image = file[0];

  const metadata: TokenMetadata = {
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
    description,
    imageHash: "",
  };

  // Upload image to IPFS
  const imageResponse = await fleekSdk.storage().uploadFile({
    file: image,
  });

  console.log("imageResponse", imageResponse.pin.cid);

  metadata.imageHash = imageResponse.pin.cid;

  return metadata;
};

const deployTokenViaContract = async (
  createToken: CreateToken,
  metadataHash: string
) => {
  const symbol = createToken.ticker.toUpperCase();
  const { request } = await simulateContract(config, {
    abi: greenLaunchpad,
    address: import.meta.env.VITE_GREEN_LAUNCHPAD_CONTRACT,
    functionName: "deployToken",
    args: [createToken.name, symbol, metadataHash, BigInt(1 * 10 ** 27)],
  });
  const hash = await writeContract(config, request);

  console.log("hash", hash);

  return hash;
};
