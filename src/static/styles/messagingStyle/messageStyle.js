import { StyleSheet } from 'react-native';


export default StyleSheet.create({
	
	container: {
	    padding: 15,
	    flex:1,
	},
	top:{
		flex:9,
		backgroundColor:'yellow',
	},
	bottom:{
		flex:1,
	},
	bottomWriteBarAndButtonView:{
		flexDirection:'row',
		
	},
	bottomLeftView:{
		flex:14,
//		justifyContent:'center',
//		backgroundColor:'lime',
//	    alignItems:'center',
	},
	bottomRightView:{
		flex:2,
		justifyContent:'center',
	    alignItems:'center',
//		backgroundColor:'cyan',
	},
	textInputMessageStyle:{
		height: 42,
	    margin: 12,
	    borderWidth: 1,
	    padding: 10,
	    borderBottomLeftRadius: 20,
    	borderBottomRightRadius: 20,
    	borderTopLeftRadius: 20,
    	borderTopRightRadius: 20,
	}
	
});