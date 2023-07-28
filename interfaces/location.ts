export interface Address {
  suburb: string;
  city: string;
  country: string;
}

export interface GetAllLocation {
  address: Address;
  boundingbox: string[];
  display_name: string;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: number;
  powered_by: string;
}