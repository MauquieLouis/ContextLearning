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


import MessageZone from '../messagings/messageZone';


	var lastMessages;
//Messaging Screen
const MessagingScreen = (props) => {
	
	//Get current session and user.	
	const { user } = useUserContext();
	//Get the messagings to listen
	const { messagingsToListen } = useMessagingContext();
	
	const [message, setMessage] = useState('');
	const [lastMessages, setLastMessages] = useState(null);
	const [idMessaging, setIdMessaging] = useState(null);
	const [messaging, setMessaging] = useState(null);
	const [loading, setLoading] = useState(false);
	const [maxId, setMaxId] = useState(null);
	
	var messagingGet;
	var isNew;
	var id_messaging;
	
	function getAndSetMaxId(arr, prop){
		var max;
		for(var i=0; i<arr.length; i++){
			if(max == null || arr[i][prop] > max)
				max = arr[i][prop];
		}
		console.log("THE SUPPPPEEEEERRRR MAAAAAAXXXXX IS : "+max);
		setMaxId(max);
		return max;
	}
	
	useEffect(() => {
		console.log("useEffect of messagingScreen.");
		getOrCreateMessagings();
		RefreshMessages();
	},[messagingsToListen]);
	
	//This is a way to get lasts message, by taking the last id and getting all message with and id higher, but not
	//very perfect, we can miss some message for sure, HAVE TO FIND A BEST WAY TO DO IT.
	
	
	const RefreshMessages = async () => {
		console.log("New Message Received !");
		setLoading(true);
		try{
			const { data, error } = await supabaseClient.from('message').select().eq('messaging', messaging["id"])
			.gt('id',maxId);
			console.log("Data : ");
			console.log(data);
			setLastMessages((lastMessages) => [...lastMessages, data]);
			console.log(lastMessages);
			getAndSetMaxId(data,"id");
		}catch(error){
			console.log("Error in Refresh Messages : ");
			console.log(error);			
		}finally{
			setLoading(false);			
		}
		//Format date like this to use in request : ((new Date()).toISOString()).toLocaleString('zh-TW')
	}
	
	const getOrCreateMessagings = async () => {
		if(messaging != null){
			console.log("MESSAGING NOT NULL EXIT");
			return
		}
		console.log("MESSAGING NULL : LOOKING FOR A MESSAGING");
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
			messagingGet = data[0];
//			setMessaging(data[0]);
			if(data.length){
				isNew = false;
			}else{
				isNew = true;
			}
			if(!data.length){
				//No data : create a new messaging
				const { data, error } = await supabaseClient.from('messaging').insert([{
					creator_id:user["identities"][0]["id"],
					users:usersJSON,
					messaging_id:messaging_id
				}]);
//				setMessaging(data[0]);
				messagingGet = data[0];
				isNew = true;
			}
			/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
		}catch(error){
			console.log("error Catch in getOrCreateMessaging in messagingScreen.js : ");
			console.log(error);
		}finally{
			setMessaging(messagingGet)
			console.log(messaging);
			if(!isNew){
				getLast30MessagesOfMessaging();
			}
		}
	}
	
	const getLast30MessagesOfMessaging = async () => {
		//All is in the function name.
		console.log("Gets last messages.");
		setLoading(true);
		try{
			const { data, error } = await supabaseClient.from('message').select().eq('messaging', messagingGet["id"]).range(0,30);
//			lastMessages=data;
			console.log(messagingGet["id"]);
			setLastMessages(data);
			getAndSetMaxId(data,"id");
			console.log('Message data : ');
//			console.log(data);
//			console.log(lastMessages)
//			console.log(error);
		}catch(error){
			console.log(error);
		}finally{
			setLoading(false);
		}
	}
	
	const sendMessage = async () => {
		try{
			const { dataMessaging, errorMessaging } = await supabaseClient.from('messaging')
			.update({nb_message: messaging["nb_message"]+1+"",
			 last_message:((new Date()).toISOString()).toLocaleString('zh-TW')})
			.eq('messaging_id', messaging["messaging_id"]);
			console.log("DataMessaging :");
			console.log(dataMessaging);
			console.log(errorMessaging);
			const { data, error } = await supabaseClient.from("message").insert([{
				text:message,
				type:'text',
				messaging:messaging["id"],
				send_by:user["identities"][0]["id"]
				}]);
				console.log("Data message : " );
				console.log(data);
				console.log(error);
		}catch(error){
			console.log("ERROR in sendMessage in messagingScreen.js")
			console.log(error);
			console.log(errorMessaging)
		}finally{
			
		}
	}
	
	const renderItem = ({ item }) => (
		loading ? 
		<Loader/>
		:
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