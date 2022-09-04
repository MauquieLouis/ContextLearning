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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf:'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  textInfo:{
	fontSize:17,
	color:"#676767",
	},
	columnContainer:{
		flexDirection:"column",
		flex:1,
	},
	columnReverseContainer:{
		flexDirection:"column-reverse",
		flex:1,
	},
	touchableEditProfile:{
		borderRadius:12,
	},
	flexDown:{
		flex:2,
		borderColor:"red",
		borderWidth:1
	},
	flexUp:{
		flex:10,
		borderColor:"red",
		borderWidth:1,
	},
	flexPicture:{
		flex:2,
	},
	flexText:{
		flex:6
	},
	flexWrap:{
		flexWrap:"wrap-reverse",
		paddingRight:10,
	},
	positionInfos:{
		paddingRight:10,
		marginRight:10,
		
	},
});