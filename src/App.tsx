import { useEffect, useReducer } from 'react';
import AppContext from './contexts/AppContext.ts';

// Types
import type { ReducerStateType } from './types/types.ts';
import type { ReducerActionType } from './types/types.ts';
import type { CityType } from './types/types.ts';
import type { WeatherType } from './types/types.ts';

// Custom Hook
import useLocalStorage from './hooks/useLocalStorage.tsx';

// Components
import Wrapper from './components/Wrapper.tsx';
import Search from './components/Search.tsx';
import Dropdown from './components/Dropdown.tsx';
import Message from './components/Message.tsx';
import Today from './components/Today.tsx';
import Forecast from './components/Forecast.tsx';

const initialState: ReducerStateType = {
	input: '',
	cityEntered: '',
	cities: [] as CityType[],
	weather: {} as WeatherType,
	loading: false,
	error: false,
	typing: false,
	message: '',
};

const reducer = (state: ReducerStateType, action: ReducerActionType): ReducerStateType => {
	switch (action.type) {
		case 'user_input':
			return { ...state, input: action.payload };
		case 'city_name_entered':
			return { ...state, cityEntered: action.payload };
		case 'cities_fetched':
			return { ...state, cities: action.payload };
		case 'weather_fetched':
			return { ...state, weather: action.payload };
		case 'loading_check':
			return { ...state, loading: action.payload };
		case 'error_check':
			return { ...state, error: action.payload };
		case 'typing_check':
			return { ...state, typing: action.payload };
		case 'message':
			return { ...state, message: action.payload };
	}
};

const App = (): JSX.Element => {
	const [storedCity, setStoredCity] = useLocalStorage<CityType>(
		'react-weather.city',
		{} as CityType
	);

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleCitySelect = (id: number): void => {
		//
		const selectedCity: CityType | undefined = state.cities.find((city) => id === city.id);
		if (selectedCity !== undefined) {
			setStoredCity(selectedCity);
		}
	};

	useEffect((): void => {
		const searchCity = async (cityEntered: string): Promise<void> => {
			try {
				const url: string = `https://geocoding-api.open-meteo.com/v1/search?name=${cityEntered}&count=10&language=en&format=json`;

				const response: Response = await fetch(url);
				if (response.ok !== true) {
					throw new Error();
				}

				const data: {
					generationtime_ms: number;
					results: CityType[];
				} = await response.json();

				dispatch({ type: 'cities_fetched', payload: data.results });
				dispatch({ type: 'error_check', payload: false });
			} catch (error) {
				if (error instanceof Error) {
					dispatch({ type: 'message', payload: 'Failed to fetch' });
					dispatch({ type: 'error_check', payload: true });
				} else {
					dispatch({ type: 'message', payload: 'Failed to fetch' });
					dispatch({ type: 'error_check', payload: true });
				}
			}
		};
		if (state.cityEntered.length > 0) {
			searchCity(state.cityEntered);
		}
	}, [state.cityEntered]);

	useEffect((): void => {
		const fetchWeather = async (city: CityType): Promise<void> => {
			try {
				dispatch({ type: 'loading_check', payload: true });
				dispatch({ type: 'message', payload: 'Loading...' });

				const url: string = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=${city.timezone}`;

				const response: Response = await fetch(url);
				if (response.ok !== true) {
					throw new Error();
				}
				const data: WeatherType = await response.json();

				dispatch({ type: 'weather_fetched', payload: data });
				dispatch({ type: 'error_check', payload: false });
			} catch (error) {
				if (error instanceof Error) {
					dispatch({ type: 'message', payload: 'Failed to fetch' });
					dispatch({ type: 'error_check', payload: true });
				} else {
					dispatch({ type: 'message', payload: 'Failed to fetch' });
					dispatch({ type: 'error_check', payload: true });
				}
			} finally {
				dispatch({ type: 'loading_check', payload: false });
			}
		};
		if (Object.keys(storedCity).length > 0) {
			fetchWeather(storedCity);
			document.title = `${storedCity.name}, ${storedCity.country} | MeteoForecast`;
		} else {
			document.title = 'MeteoForecast - React TypeScript Weather App';
		}
	}, [storedCity]);

	return (
		<AppContext.Provider
			value={{
				input: state.input,
				cityEntered: state.cityEntered,
				cities: state.cities,
				weather: state.weather,
				loading: state.loading,
				error: state.error,
				typing: state.typing,
				message: state.message,
				dispatch: dispatch,
				onCitySelect: handleCitySelect,
			}}
		>
			<Wrapper>
				<Search />

				{/* Displaying dropdown while user is typing */}
				{!state.error && state.typing === true && state.cities !== undefined && (
					<Dropdown />
				)}

				{/* Displaying loading message */}
				{state.loading && <Message />}

				{/* Displaying error message */}
				{!state.loading &&
					state.error &&
					(state.input.length > 0 || Object.keys(storedCity).length > 0) && <Message />}

				{/* Displaying weather info */}
				{!state.loading && !state.error && Object.keys(state.weather).length > 0 && (
					<>
						<Today storedCity={storedCity} />
						<Forecast storedCity={storedCity} />
					</>
				)}
			</Wrapper>
		</AppContext.Provider>
	);
};

export default App;
