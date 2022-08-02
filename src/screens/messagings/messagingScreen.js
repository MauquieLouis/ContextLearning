// /src/screens/messagings/messagingsScreen.js
//-----------------------------
// Import all stranges modules from react / native / elements / style
//-----------------------------
import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, KeyboardAvoidingView, TouchableHighlight, FlatList, Button } from 'react-native';
import styles from '../../static/styles/messagingStyle/messageStyle';
//-----------------------------
// Import all things from supabase 
//-----------------------------
import { supabaseClient  } from '../../../lib/initSupabase';
//Import UserContext
import {UserContextProvider, useUserContext } from "../../context/userContext";
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


import MessageZone from '../messagings/messageZone';

	var lastMessages;
//Messaging Screen
const MessagingScreen = (props) => {
	
	//Get current session and user.	
	const {session, user} = useUserContext();
	
	const [message, setMessage] = useState('');
	const [lastMessages, setLastMessages] = useState(null);
	const [idMessaging, setIdMessaging] = useState(null);
	
	var messaging;
	var isNew;
	var id_messaging;
	
	useEffect(() => {
		getOrCreateMessagings();
	},[]);
	
	const getOrCreateMessagings = async () => {
		//Search in messagings table if a messagings between these two user exist.
		//Create the users json table to search;
		//Always put the lowest id in first.
		if(user["identities"][0]["id"] < props.route.params.userId){
			//Put this session user in first
			var users = {user1:user["identities"][0]["id"],user2:props.route.params.userId};
			var messaging_id = user["identities"][0]["id"]+""+props.route.params.userId;
		}else{
			//Put the other from the route params
			var users = {user1:props.route.params.userId,user2:user["identities"][0]["id"]};
			var messaging_id = props.route.params.userId+""+user["identities"][0]["id"];
		}
		var usersJSON = JSON.stringify(users);
//		console.log(usersJSON);
		try{
			/*-*-*-*-*-*-*-*-*-*-*-*-TRY TO REPLACE WITH 'UPSERT'*-*-*-*-*-*-*-*-*-*-*-*-*-*/
			//Use upsert Function to insert or update if it already exist -> I have made some try, I didn't succeed
			const { data, error } = await supabaseClient.from('messaging').select().eq('messaging_id',messaging_id);//.eq('users',usersJSON);
			messaging = data[0];
			if(messaging["nb_message"]){
				isNew = false;
			}else{
				isNew = true;
			}
			console.log("------Data messagings not new : -------")
			console.log(data)
			if(!data.length){
				//No data : create a new messaging
				const { data, error } = await supabaseClient.from('messaging').insert([{
					creator_id:user["identities"][0]["id"],
					users:usersJSON,
					messaging_id:messaging_id
				}]);
				console.log("------Data messagings new : -------")
				console.log(data)
				messaging = data[0];
				isNew = true;
			}
			/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
		}catch(error){
			console.log("error Catch : ");
			console.log(error);
		}finally{
//			console.log("Finally !");	
//			console.log(messaging);		
//			id_messaging = messaging["id"];
			setIdMessaging(messaging["id"]);
			if(isNew){
				getLast30MessagesOfMessaging();
			}
		}
	}
	
	const getLast30MessagesOfMessaging = async () => {
		console.log("Gets last messages.");
		try{
			const { data, error } = await supabaseClient.from('message').select().eq('messaging', idMessaging).range(0,30);
//			lastMessages=data;
			setLastMessages(data);
			console.log('Message data : ');
//			console.log(data);
			console.log(lastMessages)
			console.log(error);
		}catch(error){
			console.log(error);
		}finally{
			
		}
	}
	
	const sendMessage = async () => {
		try{
			const { data, error } = await supabaseClient.from("message").insert([{
				text:message,
				type:'text',
				messaging:idMessaging,
				send_by:user["identities"][0]["id"]
				}]);
				console.log("Data message : " );
				console.log(data);
				console.log(error);
		}catch(error){
			console.log(error);
		}finally{
			
		}
	}
	
	const renderItem = ({ item }) => (
		<MessageZone item={item}/>
  	);
  	
//	getOrCreateMessagings();
	return(
		<KeyboardAvoidingView style={{flex:1}}>
			<View style={styles.container}>
				{/**Top zone to display messages */}
				<View style={styles.top}>
					 <FlatList
				        data={lastMessages}
				        extraData={lastMessages}
				        renderItem={renderItem}
				      />
				      <Button title="Refresh" onPress={() => {getLast30MessagesOfMessaging()}}/>
				</View>
				{/**Bottom bar to write a message */}
				<View style={styles.bottom}>
					<View style={styles.bottomWriteBarAndButtonView}>
						{/** Left zone */}
						<View style={styles.bottomLeftView}>
							<TextInput
								style={styles.textInputMessageStyle}
								onChangeText={text => {setMessage(text);}}
								placeholder="Write a message"
							/>
						</View>
						{/** Right zone */}
						<View style={styles.bottomRightView}>
							<TouchableHighlight
								onPress={() => {sendMessage()}}>
								<FontAwesomeIcon icon={faAngleDoubleRight} color={'grey'} size={24}/>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

export default MessagingScreen;