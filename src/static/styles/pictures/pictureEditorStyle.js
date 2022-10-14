import { StyleSheet } from 'react-native';


export default StyleSheet.create({
	
	mainContainer:{
		flexDirection:"column",
	},
	
	horizontalView:{
		flexDirection:"row",
		alignItems:'center',
		justifyContent:'center',
	},
	
	elemInHorizontalView:{
		padding:10,
		margin:10,
		borderWidth:1,
		borderColor:'#25ADAD',
		borderRadius:5,
	},
	
	imageView:{
		alignItems:'center',
		justifyContent:'center',
	},
	
	titleView:{
		alignItems:'center',
		justifyContent:'center',
		marginBottom:20,
		marginTop:20,
	},
	
	textStyle:{
		fontSize:20,
		color:'black',
	}

});