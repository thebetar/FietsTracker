import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Card, Text, FAB } from 'react-native-elements';

import { Tracker } from '../../types';
import axios from '../../axios';
import TrackerListItem from '../components/Trackers/TrackerListItem';

export default function TrackersScreen({ navigation, route }: any) {
	const [trackers, setTrackers] = useState<Tracker[]>([]);

	useEffect(() => {
		getTrackers();
	}, [route?.params?.tracker]);

	async function getTrackers() {
		try {
			const {
				data: { trackers }
			} = await axios.get('/trackers');
			setTrackers(trackers);
		} catch (error) {
			console.error(error);
		}
	}

	function renderItem({ item, index }: { item: Tracker; index: number }) {
		return (
			<TrackerListItem
				tracker={item}
				index={index}
				navigation={navigation}
			/>
		);
	}

	return (
		<>
			<Card>
				<Card.Title>Trackers</Card.Title>
				<FAB
					onPress={getTrackers}
					icon={{ name: 'refresh', color: 'white' }}
					title="Refresh"
					color="blue"
					style={{ marginBottom: 8 }}
				/>
				<Card.Divider />
				{trackers.length === 0 ? (
					<Text h4>Laden...</Text>
				) : (
					<FlatList
						data={trackers}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						scrollEnabled={true}
					/>
				)}
			</Card>
		</>
	);
}
