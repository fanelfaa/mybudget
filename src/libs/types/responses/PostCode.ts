export type ProvinceResponse = Record<string, string>;
export type CityResponse = Record<string, string>;

export interface PostCode {
	kecamatan: string;
	kelurahan: string;
	kodepos: string;
}

export type PostCodesResponse = PostCode[];
