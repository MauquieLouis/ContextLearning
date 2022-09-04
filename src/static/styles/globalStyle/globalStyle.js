// ================================== //
// ======== S T Y L E S ============= //
// ================================== //
import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';
const { height } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
    	marginTop: 10,
    	padding: 12,
    	flex:1,
	},
	contentContainerStyleScrollView:{
		flexGrow: 1,
	},
	rowContainer:{
		flexDirection:"row",
	},
	rowReverseContainer:{
		flexDirection:"row-reverse",
	},
	columContainer:{
		flexDirection:"column",
	},
	columnReverseContainer:{
		flexDirection:"column-reverse",
	},
	greyLine:{
		borderTopWidth:1,
		borderTopColor:"grey",
		marginTop:10,
		marginBottom:10,
		width:"80%",
		marginLeft:"10%",
	},
	mgTop10:{
		marginTop:10,
	},
	mgBottom10:{
		marginBottom:10,
	},
	mgLeft10:{
		marginLeft:10,
	},
	mgRight10:{
		marginRight:10,
	},
	mgTop20:{
		marginTop:20,
	},
	mgBottom20:{
		marginBottom:20,
	},
	mgLeft20:{
		marginLeft:20,
	},
	mgRight20:{
		marginRight:20,
	},
	padding10:{
		padding:10,
	},
	paddingLeft20:{
		paddingLeft:20
	},
	paddingBottom20:{
		paddingBottom:20
	},
	paddingRight20:{
		paddingRight:20
	},
	paddingTop20:{
		paddingTop:20
	},
	justifyContentCenter:{
		justifyContent:"center",
	},
	alignItemsCenter:{
		alignItems:"center"
	},
	title:{
		textAlign:"center",
		fontSize:20,
		fontWeight:"bold",
		color:"#565656",
	}
});