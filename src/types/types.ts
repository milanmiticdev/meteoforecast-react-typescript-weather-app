export interface CityType {
	admin1?: string;
	admin1_id?: number;
	admin2?: string;
	admin2_id?: number;
	admin3?: string;
	admin3_id?: number;
	admin4?: string;
	admin4_id?: number;
	country?: string;
	country_code?: string;
	country_id?: number;
	elevation?: number;
	feature_code?: string;
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	population?: number;
	postcodes?: string[];
	timezone?: string;
}

export interface ContextProviderValueType extends ReducerStateType {
	dispatch: React.Dispatch<ReducerActionType>;
	onCitySelect: (id: number) => void;
}

export type ReducerActionType =
	| { type: 'user_input'; payload: string }
	| { type: 'city_name_entered'; payload: string }
	| { type: 'cities_fetched'; payload: CityType[] }
	| { type: 'weather_fetched'; payload: WeatherType }
	| { type: 'loading_check'; payload: boolean }
	| { type: 'error_check'; payload: boolean }
	| { type: 'typing_check'; payload: boolean }
	| { type: 'message'; payload: string };

export interface ReducerStateType {
	input: string;
	cityEntered: string;
	cities: CityType[];
	weather: WeatherType;
	loading: boolean;
	error: boolean;
	typing: boolean;
	message: string;
}

export type UseLocalStorageType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export interface WeatherType {
	daily: {
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		time: string[];
		uv_index_max: number[];
		weathercode: number[];
	};
	daily_units: {
		temperature_2m_max: string;
		temperature_2m_min: string;
		time: string;
		uv_index_max: string;
		weathercode: string;
	};
	elevation: number;
	generationtime_ms: number;
	latitude: number;
	longitude: number;
	timezone: string;
	timezone_abbreviation: string;
	utc_offset_seconds: number;
}

export interface DateType {
	day: number;
	month: number;
	year: number;
}
