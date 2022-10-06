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
import {MessagingContextProvider, useMessagingContext } from "../../context/messagingContext";
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../components/Loader';

import TextMessage from '../../components/messageComponents/textMessage';


	/**
	*************************************************************************
	***- - - - - = = = = =   F U N C T I O N I N G   = = = = = = - - - - -***
	*************************************************************************
	
	1) Once we FOUND the user, with the search component we get here !
	
	2) Then, we CHECK if a messagings exist between connected user and the user searched
	
	3) If one exist, we can LOAD THE OLD MESSAGES
	
	4) If not, we do nothing... except if the user SEND a message

	5) If the user send a message, and the messaging not exist, we first CREATE THE MESSAGING
	
	6) Then SEND the message.

	*************************************************************************
	**- - - - - = = = = =  T H I N G S   T O   K N O W  = = = = = - - - - -**
	*************************************************************************
	
	- When creating a messaging users are added in an array field named users.
	
	- When a message is send the message count in messaging is updated
	
	- 
	
	*************************************************************************
	**- - - - - = = = = = E N D   F U N C T I O N I N G = = = = = - - - - -**
	*************************************************************************
	**/
//Messaging Screen
const MessagingScreen = (props) => {
	
	//Get current session and user.	
	const { user } = useUserContext();
	//Get the messagings to listen
	const { messagingsToListen } = useMessagingContext();
	
	const [message, setMessage] = useState('');
	const [lastMessages, setLastMessages] = useState(null);
	const [messaging, setMessaging] = useState(null);
	const [loading, setLoading] = useState(false);
	const [messagingHasBeenCreated, setMessagingHasBeenCreated] = useState(false);
	
	useEffect(() => {
		checkForMessaging();
	},[messagingsToListen]);
	
	useEffect(() => {
		console.log("Effect New message on new conv")
		if(messagingHasBeenCreated){
			sendMessage();
			setMessagingHasBeenCreated(false);
		}else{
			if(messaging){
				loadLastMessages();
			}
		}
	},[messaging]);
	
	useEffect(() => {
		//Use effect to handle new message incoming, from the second user in the conv...
	},[]);
	
	/**-----------------------------------------
		CHECK IF A MESSAGING EXIST function
	 ----------------------------------------**/
	const checkForMessaging = async () => {
		try{
			let { data : messagingChecked, error } = await supabaseClient.from('messaging').select("*").contains('users', [user["id"],props.route.params.userId]);
			if(messagingChecked != null && messagingChecked.length >0 ){
					console.log(messagingChecked)
					setMessagingHasBeenCreated(false);
					setMessaging(messagingChecked[0]);
//					console.log("TODO : load last messages ... and remove console.log");
//					Load last messages.
					//Set them in the state.
			}else{
				setMessagingHasBeenCreated(true);
			}
		}catch(error){
			console.log("Error in checkForMessaging in messagingScreen.js");
			console.log(error)
		}finally{
			
		}
	}

	/**--------------------------------
		CREATE A MESSAGING function
	 --------------------------------**/
	const createMessaging = async () => {
		setLoading(true);
		const messagingToCreate = {
			creator_id: user["id"],
			users: [user["id"],props.route.params.userId]
		}
		try{
			const { data : messagingCreated, error } = await supabaseClient.from('messaging').insert([
				messagingToCreate
				]);
			setMessaging(messagingCreated[0]);
			console.log("MESSAGING CREATED AND ERROR");
			console.log(messagingCreated);
			console.log(error);
		}catch(error){
			
		}finally{
			setLoading(false);
			
		}
	}
	
	/**--------------------------------
		   SEND A MESSAGE function
	 --------------------------------**/
	const sendMessage = async () => {
		setLoading(true);
		const messageToInsert = {
			messaging: messaging["id"],
			text: message,
			type: 'text',
			sender: user["id"],
			receiver: props.route.params.userId,
			message_number: messaging["nb_message"]+1
		}
		const messagingToUpdate = {
			nb_message: messaging["nb_message"]+1,
			last_message: ((new Date()).toISOString()).toLocaleString('zh-TW')
		}
		//At first send the message, then update data in messaging
		try{
			const { data: messageSend, errorMessage } = await supabaseClient.from("message").insert([messageToInsert]);
			const { data: messagingUpdated, errorMessaging } = await supabaseClient.from("messaging")
				.update(messagingToUpdate)
				.eq("id",messaging["id"]);
				if(errorMessage || errorMessaging){
					console.log("Error in sendMessage");
					console.log(errorMessage);
					console.log(errorMessaging);
				}
				if(!lastMessages){
					setLastMessages(messageSend);			
				}else{
					setLastMessages(oldLastMessages => [...oldLastMessages, ...messageSend]);
				}
		}catch(error){
			console.log("Error in sendMessage in messagingScreen.js");
			console.log("error");			
		}finally{
			console.log("Last Messages State : ");
			console.log(lastMessages);
			setLoading(false);
			
		}
	}

	/**--------------------------------
		   SEND A MESSAGE function
	 --------------------------------**/
	const handleNewMessageSend = async () => {
		if(!messaging){
			createMessaging();
		}else{
			sendMessage();
		}
	}
	
	/**--------------------------------
		   SEND A MESSAGE function
	 --------------------------------**/
	const handleNewMessageReceived = async () => {
		// - - TODO - -
	}
	
	const loadLastMessages = async () => {
		//Here we load the last 30 messages
		var messagesTable = [];
		for(var i = messaging["nb_message"]; i>0; i--){
			messagesTable.push(i);
		}
		try{
			const { data : lastMessages, error } = await supabaseClient.from("message").select("*")
			.eq("messaging",messaging["id"])
			.in("message_number",messagesTable);
			setLastMessages(lastMessages);
		}catch(error){
			console.log("Error in LoadLastMessage in messagingScreen.js");
			console.log(error);
		}finally{
			
		}
	}
	
	
	
	const renderItem = ({ item }) => (
//		console.log(item)
		<TextMessage message={item}/>
  	);
  	 
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
								onPress={() => {handleNewMessageSend()}}>
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