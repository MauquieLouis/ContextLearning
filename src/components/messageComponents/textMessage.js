// src/components/messageComponents/textMessage.js
import React from 'react';
import {Text, View} from 'react-native';

import styles from '../../static/styles/messagingStyle/textMessageStyle';

import { useUserContext } from '../../context/userContext';



//MessageZone
const TextMessage = (props) => {
//	console.log(props);
	const { user, profile } = useUserContext();
	if(props.message["sender"] == user["id"]){
		return(
			<View style={styles.myMessage}>
				<Text style={styles.myMessageTextAlign}>{profile["username"]} : 
					<Text> {props.message["text"]}</Text>
				</Text>
			</View>
		);
	}else{
		return(
			<View style={styles.otherMessage}>
				<Text style={styles.otherMessageText}>{props.receiver["username"] } : 
					<Text > {props.message["text"]}</Text>
				</Text>
			</View>
		);
	}
}

export default TextMessage;