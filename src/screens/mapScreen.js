// screens/mapScreen.js
//-----------------------------
// Import all modules
//-----------------------------
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, PermissionsAndroid, Image, TouchableHighlight, Button} from 'react-native';

//import {AppContextProvider, useAppContext } from "../context/appContext";
//-----------------------------
// Import maps components
//-----------------------------
import MapboxGL from '@rnmapbox/maps';
//-----------------------------
// Import geolocation
//-----------------------------
import Geolocation from 'react-native-geolocation-service';

// FR -- Ligne à laisser pour instancier la mapboxGL (pas besoin de token car on utilise un layer open source)
// EN -- Keep this line to instanciate a mapboxGl (no token needed, because we are using an open source layer)
MapboxGL.setAccessToken("<YOUR_ACCESSTOKEN>");

//Map Screen
const MapScreen = ({props}) => {
//	const [location, setLocation] = useState(null);
//	const {username, country} = useAppContext();		
	
	useEffect(() => {
		//.-.-.-.-.-.-.-.-.-.-.-:* UNCOMMENT TO REQUEST FOR POSITION *:-.-.-.-.-.-.-.-.-.-.//
//		requestLocationPermission();
//		Geolocation.getCurrentPosition(
//	        (position) => {
////	          setLocation(position.coords);
//	        },
//	        (error) => { 
//	          // See error code charts below.
//	          console.log(error.code, error.message);
//	        },
//	        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//	    );
		//.-.-.-.-.-.-.-.-.-.-.-:* ================================= *:-.-.-.-.-.-.-.-.-.-.//
	},[]);
  
	return( 
		<View style={styles.page}>
        	<View style={styles.container}>
          		<MapboxGL.MapView style={styles.map} styleJSON={JSON.stringify(defaultStyle)} rotateEnabled={false}>
          			<MapboxGL.UserLocation animated={true} visible={true} showsUserHeadingIndicator={true} androidRenderMode={"normal"}/>
          			<MapboxGL.Camera followUserLocation={true}/>
          			<MapboxGL.Camera zoomLevel={5} centerCoordinate={[3.087025,45.777222]}/>
            	</MapboxGL.MapView>
        	</View>
      	</View>
	);
}

export default MapScreen;

const requestLocationPermission = async () =>{
		
	//ask for Android permission for Location
	//====== MAYBE ADD A TEST BEFORE ========
	//BECAUSE IF USER VALIDATE ONCE, IT'S NOT
	//NECESSARY TO ASK AGAIN.
	//=======================================
		try{
			const grantedLocation = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title:"RNV Location Permission",
					message:"RNV would like to access to your position,"+
					" to allow you to meet some new friends.",
					buttonNeutral:"Ask Me Later",
					buttonNegative:"Cancel",
					buttonPositive:"OK"
				}
			);	
			if(grantedLocation === PermissionsAndroid.RESULTS.GRANTED){
				console.log("Can use Location now !");
				//If user accept GeoLocation, we can get geoLocation
				
				return true;
			}else{
				console.log("Can't use Location now !");
				return null;
			}
		}catch(err){
			console.warn(err);
		}
		return null;
}
		
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: 680,
    width: 388,
    backgroundColor: '#ECECEC'
  },
  map: {
	flex: 1
  },
	locationButton:{
		justifyContent: 'center',
    	alignItems: 'center',
	}
  
});

const defaultStyle = {
  version: 8,
  name: 'Land',
  sources: {
    map: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      minzoom: 1,
      maxzoom: 19,
		
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#ECECEC',
      },
    },
    {
      id: 'map',
      type: 'raster',
      source: 'map',
      paint: {
        'raster-fade-duration': 100,
      },
    },
  ],
};


/**

Geolocation.getCurrentPosition(
	        (position) => {
	          setLocation(position.coords);
	        },
	        (error) => {
	          // See error code charts below.
	          console.log(error.code, error.message);
	        },
	        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
	    );
 */

/** {location ? <>
	          		<MapboxGL.Camera
			            defaultSettings={{
			              centerCoordinate: [location["longitude"], location["latitude"]],
			              //centerCoordinate: [1.3529599,44.0221252],
			              zoomLevel: 8,
			            }}
			          />
	          		<MapboxGL.MarkerView 
	          		 coordinate={[location["longitude"], location["latitude"]]}
	          		 //coordinate={[1.3529599,44.0221252]}
		          		children={
		              <Image
		                source={{
		                  uri: 'https://www.r7.jawg.io/docs/images/icons/big-ben.png',
		                }}
		                style={{width: 25, height: 25}}
		              />
	            	}
	            	anchor={{x: 0, y: 0.5}}/> 
	            	</> : <>
	            		<MapboxGL.UserLocation animated={true} visible={true} showsUserHeadingIndicator={true} androidRenderMode={"normal"}/>
	            	</>
            	}*/
