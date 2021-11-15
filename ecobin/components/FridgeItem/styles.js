import { StyleSheet } from 'react-native'
 
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
   },
   iconContainer: {
     width: 80,
     height: 80,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 5,
     backgroundColor: '#404040',
     marginRight: 10,
   },
   name: {
     fontSize: 20,
     marginRight: 5,
     color: 'black',
   },
   expDate: {
     color: 'red',
     textAlign: 'right',
     flex: 1,
   },
 })
 
 export default styles