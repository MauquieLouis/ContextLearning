// src/screens/messagings/messageZone.js
import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';

//MessageZone
const MessageZone = (props) => {
	
//	console.log('items  : ');
	return(
		<View>
			<Text>item : {props.item['text']}</Text>
		</View>
	);
}

export default MessageZone;