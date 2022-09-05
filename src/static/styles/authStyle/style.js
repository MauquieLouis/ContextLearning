import { StyleSheet } from 'react-native';


export default StyleSheet.create({
	boldText:{
		fontWeight:'bold',
	},
	bigText:{
		fontSize:20,
	},
	centerText:{
		textAlign:'center',
	},
	container: {
	    padding: 15,
	    justifyContent:'center',
	    flex:1,
	},
	signUpFullText:{
		textAlign:'center',
	},
	signUpText:{
		color:'blue',
		fontWeight:'bold',
	},
	forgotPasswordView:{
		alignSelf:'flex-end',
	},
	imageBrand:{
		width:110,
		height:110,
	},
	imageView:{
		justifyContent:'center',
		alignItems:'center',
	},
	greyLine:{
		marginTop:25,
		marginBottom:25,
		width:'75%',
		borderTopColor:'grey',
		borderTopWidth:1,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	textInputStyle:{
		height:30,
		margin:12,
		borderWidth:1,
		padding:10,
	},
	top:{
//		backgroundColor:'blue',
		flex:6,
		justifyContent:'center',
//	    alignItems:'center', //Used to center horizontal
	},
	bottom:{
//		backgroundColor:'red',
		flex:1,
		justifyContent:'center',
	    alignItems:'center', //Used to center horizontal
	},
	mBot10:{
		marginTop:-10,
		marginBottom:20,
	},
	mTop10:{
		marginTop:10,
	},
	mTop20:{
		marginTop:20,
	}		
});