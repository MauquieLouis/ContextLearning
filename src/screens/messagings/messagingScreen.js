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
import { useUserContext } from "../../context/userContext";
import { useMessagingContext } from "../../context/messagingContext";
//-----------------------------
// Import icons and Toast
//-----------------------------
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../components/Loader';

import TextMessage from '../../components/messageComponents/textMessage';

import GetProfileFromId from '../../components/profile/getProfileFromId';



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
	const { user, profile } = useUserContext();
	//Get the messagings to listen
	const { numberOfUnreadedMessaging, newMessage, lastMessage } = useMessagingContext();
	
	const [message, setMessage] = useState('');
	const [lastMessages, setLastMessages] = useState(null);
	const [messaging, setMessaging] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingGlobal, setLoadingGloabal] = useState(false);
	const [messagingHasBeenCreated, setMessagingHasBeenCreated] = useState(false);
	const [ignoreMessagingStateChange, setIgnoreMessagingStateChange] = useState(false);
	const [profileInterloc, setProfileInterloc] = useState(null);
	
	useEffect(() => {
		checkForMessaging();
		GetProfileFromId(props.route.params.userId, setLoadingGloabal, setProfileInterloc);
	}, []);
	
	useEffect(() => {
		console.log("profile interloc change");
		console.log(profileInterloc);
	}, [profileInterloc]);
	
	useEffect(() => {
		console.log("OpenMessaging")
		if(ignoreMessagingStateChange){
			console.log("Ignore message");
			return;
		}
		if(messagingHasBeenCreated){
			console.log("It's a new messaging")
			sendMessage();
			setMessagingHasBeenCreated(false);
		}else{
			if(messaging){
				console.log("")
				loadLastMessages();
			}
		}
	},[messaging]);
	
	useEffect(() => {
		//Use effect to handle new message incoming, from the second user in the conv...
		console.log("Effect new message incoming")
		console.log(lastMessages);
		if(lastMessage != null){
			handleNewMessageReceived();
		}
	},[lastMessage]);
	
	/**-----------------------------------------
		CHECK IF A MESSAGING EXIST function
	 ----------------------------------------**/
	const checkForMessaging = async () => {
		try{
			let messagingChecked = null;
			if(user["id"] == props.route.params.userId){
				let { data, error} = await supabaseClient.from('messaging').select("*").containedBy('users',[user["id"],[user["id"]]])			
				messagingChecked = data;
			}else{
				let { data, error } = await supabaseClient.from('messaging').select("*").contains('users', [user["id"],props.route.params.userId]);
				messagingChecked = data;
			}
			if(messagingChecked != null && messagingChecked.length >0 ){
					setMessagingHasBeenCreated(false);
					setMessaging(messagingChecked[0]);
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
			if(error){
				console.log("MESSAGING CREATE ERROR");
				console.log(error);
			}
		}catch(error){
			console.log("Error in createMessaging in createMessaging.js");
			console.log(error);
		}finally{
			setLoading(false);
			
		}
	}
	
	/**--------------------------------
		   SEND A MESSAGE function
	 --------------------------------**/
	const sendMessage = async () => {
		//TODO
		//Make a new check, handle user send messages at the same time... it will leads to make wrong the message number
		setLoading(true);
		console.log("Enter send message")
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
		console.log("going to the try")
		//At first send the message, then update data in messaging
		try{
			const { data : messagingUpdated , error :errorMessaging } = await supabaseClient.from("messaging")
				.update(messagingToUpdate)
				.eq("id",messaging["id"]);
				if(errorMessage || errorMessaging){
					console.log("Error in sendMessage");
					console.log(errorMessage);
					console.log(errorMessaging);
				}
			console.log("first insert made ...")
			const { data : messageSend, error : errorMessage } = await supabaseClient.from("message").insert([messageToInsert]);
			console.log("second one made too ....")
			console.log(lastMessages)
				if(!lastMessages || lastMessages == {}){
					console.log("set the new last message");
					console.log(messageSend);
					setLastMessages(messageSend);			
				}else{
					console.log("update the new last message");
					console.log(messageSend);
					setLastMessages(oldLastMessages => [ ...messageSend, ...oldLastMessages]);
				}
				console.log("Messaging maybe error here ...");
				console.log(messagingUpdated);
			setMessaging(messagingUpdated[0]); 
		}catch(error){
			console.log("Error in sendMessage in messagingScreen.js");
			console.log(error);			
		}finally{
			setIgnoreMessagingStateChange(true);
			setMessage('');
//			this.TextInput.current.clear();
			setLoading(false);
		}
	}

	/**--------------------------------
		   SEND A MESSAGE function
	 --------------------------------**/
	const handleNewMessageSend = async () => {
		setLoading(true)
		if(!messaging){
			createMessaging();
		}else{
			sendMessage();
		}
	}
	
	/**--------------------------------
		   SEND A MESSAGE function
	 --------------------------------**/
	function handleNewMessageReceived(){
		// - - TODO - -
		//PROCESS THE NEW MESSAGE HERE
		
		console.log(lastMessages)
		console.log(lastMessage)
		if(!lastMessages){
			//To improve ... this mean, if user has messaging open but no messaging already created, he will not see the first message, it will lead to some bugs...
//			setLastMessages(lastMessage);			
		}else{
			setLastMessages(oldLastMessages => [lastMessage, ...oldLastMessages]);
		}
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
			.in("message_number",messagesTable)
			.order('message_number',{ascending:false});
			setLastMessages(lastMessages);
		}catch(error){
			console.log("Error in LoadLastMessage in messagingScreen.js");
			console.log(error);
		}finally{
			setIgnoreMessagingStateChange(true);
		}
	}
	
	
	
	const renderItem = ({ item }) => (
//		console.log(item)
		<TextMessage message={item} receiver={profileInterloc[0]}/>
  	);
  	 
	return(
		<KeyboardAvoidingView style={{flex:1}}>
		{loadingGlobal ? 
			<Loader/>
		: 
			<View style={styles.container}>
				{/**Top zone to display messages */}
				<View style={styles.top}>
					 <FlatList
						inverted={-1}
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
								value={message}
							/>
						</View>
						{/** Right zone */}
						{loading ?
							<Loader/>
						:
						
						<View style={styles.bottomRightView}>
							<TouchableHighlight
								onPress={() => {handleNewMessageSend()}}>
								<FontAwesomeIcon icon={faAngleDoubleRight} color={'grey'} size={24}/>
							</TouchableHighlight>
						</View>
						}
					</View>
				</View>
			</View>
		}
		</KeyboardAvoidingView>
	);
}

export default MessagingScreen;