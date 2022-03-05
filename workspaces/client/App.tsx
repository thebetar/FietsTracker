import { StyleSheet, View, DrawerLayoutAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, Icon } from 'react-native-elements';
import { NativeRouter } from 'react-router-native';
import Layout from './components/Layout';
import Drawer from './components/Drawer';
import { useRef } from 'react';

export default function App() {
	const drawer = useRef(null);

	function toggleDrawer() {
		if (drawer && drawer.current) {
			(drawer.current as any).openDrawer();
		}
	}

	return (
		<SafeAreaProvider>
			<NativeRouter>
				<DrawerLayoutAndroid
					ref={drawer}
					renderNavigationView={Drawer}
					drawerWidth={300}
					drawerPosition={'left'}
				>
					<View>
						<Header
							leftComponent={
								<Icon
									raised
									name="menu"
									size={16}
									onPress={toggleDrawer}
								/>
							}
							centerComponent={{
								text: 'FietsTracker',
								style: styles.heading
							}}
							backgroundColor={'#4287f5'}
						/>
						<Layout />
					</View>
				</DrawerLayoutAndroid>
			</NativeRouter>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 22,
		padding: 6,
		paddingTop: 12,
		color: 'white',
		display: 'flex'
	}
});
