export interface Token {
  creator: string;
  tokenAddress: string;
  greenCurveAddress: string;
  metadata: TokenMetadata;
}

export interface TokenMetadata {
  latitude: number;
  longitude: number;
  imageHash: string;
  name: string;
  ticker: string;
  description?: string;
}

export interface CreateToken {
  description: string;
  file: FileList;
  lat: string;
  lng: string;
  name: string;
  ticker: string;
}
