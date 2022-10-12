// src/components/messageComponents/textMessage.js
import React, {  } from 'react';
import {Text, View} from 'react-native';

//MessageZone
const TextMessage = (props) => {
	return(
		<View>
			<Text>{props.message["sender"] } : 
				<Text> {props.message["text"]}</Text>
			</Text>
			
		</View>
	);
}

export default TextMessage;