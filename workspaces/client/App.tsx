import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LayoutScreen from './src/screens/Layout';
import LoginProvider from './src/context/LoginContext';

export default function App() {
	return (
		<NavigationContainer>
			<LoginProvider>
				<LayoutScreen />
			</LoginProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
