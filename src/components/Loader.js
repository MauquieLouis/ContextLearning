// src/components/Loader
//-----------------------------
// Import all stranges modules from react / native / elements
//-----------------------------
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = () => {
	return(
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size="large"/>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: "center",
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	}
})

export default Loader;