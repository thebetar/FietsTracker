import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Input, Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import axios from '../../axios';
import { Tracker } from '../../types';

export default function TrackerEditScreen({
	route,
	navigation
}: {
	route: { params: { tracker: { id: string } } };
	navigation: any;
}) {
	const [tracker, setTracker] = useState<Tracker>();

	useEffect(() => {
		getTracker();
	}, []);

	async function getTracker() {
		const { id } = route.params.tracker;

		const {
			data: { tracker }
		} = await axios.get(`/tracking/trackers/${id}`);

		setTracker(tracker);
	}

	async function saveTracker() {
		const {
			data: { trackers }
		} = await axios.put(`/tracking/trackers/${tracker?.id}`, tracker);

		navigation.navigate('TrackerList');
	}

	return (
		<>
			<Button
				title="Terug naar lijst"
				buttonStyle={{ margin: 8 }}
				onPress={() => navigation.navigate('TrackerList')}
			/>
			{tracker ? (
				<View>
					<Card>
						<Card.Title>Tracker aanpassen</Card.Title>
						<Card.Divider />
						<Input
							placeholder="Naam..."
							value={tracker.name}
							leftIcon={{ name: 'person' }}
							onChangeText={(value) =>
								setTracker({
									...tracker,
									name: value
								} as Tracker)
							}
						/>
						<Picker
							selectedValue={tracker?.type || 'bike'}
							onValueChange={(value) =>
								setTracker({
									...tracker,
									type: value
								} as Tracker)
							}
						>
							<Picker.Item label="Fiets" value="bike" />
							<Picker.Item label="Aanhangwagen" value="trailer" />
							<Picker.Item label="Motorfiets" value="motor" />
							<Picker.Item label="Overig" value="other" />
						</Picker>
						<Card.Divider />
						<Button
							title="Opslaan"
							buttonStyle={{ margin: 4 }}
							onPress={saveTracker}
						/>
					</Card>
				</View>
			) : (
				<Text h4>Laden...</Text>
			)}
		</>
	);
}
