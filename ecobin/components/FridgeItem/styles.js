import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   root: {
     flexDirection: 'row',
     width: '100%',
     padding: 10,
     borderBottomWidth: 2,
     borderColor: 'black',
     alignItems: 'center',
     justifyContent: 'center',
   },
   iconContainer: {
     width: 80,
     height: 80,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 5,
     backgroundColor: '#222222',
     marginRight: 10,
   },
   imageStyle: {
     width: '100%',
     height: '100%',
     resizeMode: 'contain',
   },
   name: {
     fontSize: 20,
     marginRight: 5,
     color: 'white',
     textAlign: 'center',
     flex: 0.7,
   },
   expDate: {
     fontWeight: 'bold',
     color: 'red',
     textAlign: 'center',
     flex: 0.3,
   },
 })
 
 export default styles