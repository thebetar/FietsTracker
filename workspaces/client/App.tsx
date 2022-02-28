import axios from './axios';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Button, Icon } from 'react-native-elements';
import Maps from './components/Maps';
import { Coords } from './types';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const [coords, setCoords] = useState<Coords>({
		latitude: undefined,
		longitude: undefined
	});

	async function getCoords() {
		try {
			const { data } = await axios.get('/coords');

			setCoords(data);

			// await AsyncStorage.setItem('coords', JSON.stringify(data));
		} catch (error) {
			setCoords(getFakeCoords());
		}
	}

	async function goToMaps() {
		const BASE_URL = 'https://www.google.com/maps/search/?api=1&query=';
		const lng = Number(coords.longitude).toFixed(7);
		const lat = Number(coords.latitude).toFixed(7);
		const RESULT_URL = `${BASE_URL}${lat},${lng}`;

		const supported = await Linking.canOpenURL(RESULT_URL);
		if (supported) {
			Linking.openURL(RESULT_URL);
		}
	}

	// Fake should be removed if server is running
	function getFakeCoords() {
		const BASE_LATITUDE = 52.335;
		const BASE_LONGITUDE = 4.86;

		const latitude = BASE_LATITUDE + Math.random() / 12;
		const longitude = BASE_LONGITUDE + Math.random() / 12;

		return {
			latitude,
			longitude
		};
	}

	// async function getCachedCoords() {
	// 	const coords = await AsyncStorage.getItem('coords');

	// 	if (coords) {
	// 		setCoords(coords as any);
	// 	}
	// }

	useEffect(() => {
		getCoords();
	}, []);

	return (
		<SafeAreaProvider>
			<View>
				<Header
					centerComponent={{
						text: 'FietsTracker',
						style: styles.heading
					}}
					backgroundColor={'#4287f5'}
				/>
				<View style={styles.container}>
					<Maps coords={coords} />
					<View style={styles.innerContainer}>
						<Button
							title={'🤔 \nWaar is mijn fiets?'}
							containerStyle={styles.buttonContainer}
							buttonStyle={{
								...styles.button,
								...styles.primary
							}}
							onPress={() => getCoords()}
						/>
						<Button
							title={'🗺️ \nGa naar maps'}
							containerStyle={styles.buttonContainer}
							buttonStyle={{
								...styles.button,
								...styles.secondary
							}}
							onPress={() => goToMaps()}
						/>
					</View>
				</View>
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '85%',
		flexDirection: 'column',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	heading: {
		fontSize: 22,
		padding: 6,
		paddingTop: 12,
		color: 'white'
	},
	buttonContainer: {
		margin: 8
	},
	button: {
		width: 140,
		fontSize: 32,
		padding: 6,
		borderRadius: 12
	},
	primary: {
		backgroundColor: '#4287f5',
		borderColor: '#244b8a',
		borderWidth: 2
	},
	secondary: {
		backgroundColor: '#a89732',
		borderColor: '#4a4216',
		borderWidth: 2
	}
});
