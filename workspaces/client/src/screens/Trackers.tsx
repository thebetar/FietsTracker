import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Card, Text, FAB } from 'react-native-elements';

import { Tracker } from '../../types';
import axios from '../../axios';
import TrackerListItem from '../components/Trackers/TrackerListItem';

export default function TrackersScreen() {
	const [trackers, setTrackers] = useState<Tracker[]>([]);

	useEffect(() => {
		getTrackers();
	}, []);

	async function getTrackers() {
		try {
			const {
				data: { trackers }
			} = await axios.get('/tracking/trackers');
			setTrackers(trackers);
		} catch (error) {
			console.error(error);
		}
	}

	function renderItem({ item, index }: { item: Tracker; index: number }) {
		return <TrackerListItem tracker={item} index={index} />;
	}

	return (
		<>
			<Card>
				<Card.Title>Trackers</Card.Title>
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
				<FAB
					onPress={getTrackers}
					placement="right"
					icon={{ name: 'refresh', color: 'white' }}
					color="blue"
				/>
			</Card>
		</>
	);
}
