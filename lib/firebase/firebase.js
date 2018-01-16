import firebase from 'firebase';
// import { GoogleSignin } from 'react-native-google-signin';
import 'firebase/database';

const DB_CONFIG = {
	apiKey: "AIzaSyAlNd7qkT8QSYE96rgfJAwPmnCbb224r-M",
	authDomain: "hw-to-do-list.firebaseapp.com",
	databaseURL: "https://hw-to-do-list.firebaseio.com",
	projectId: "hw-to-do-list",
	storageBucket: "hw-to-do-list.appspot.com",
	messagingSenderId: "579522834826"
};

firebase.initializeApp(DB_CONFIG);
let database = firebase.database();

const getData = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			let ref = database.ref('items/');
			if(ref) {
				resolve(
					ref.once('value', function(snapshot) {
						let data = snapshot.val();
						let arr_data = [];
						for(let item in data) {
							arr_data.push(data[item]);
						}
						console.log('get data succesed');
						dispatch({type: 'FETCH_DATA_SUCCESS', payload: arr_data});
					})
				)
			} else {
				reject(console.log('get data failed'))
			}
		})
	}
};

// const addData = (data) => {
// 	let uid = database.ref().child('items').push().key;

// 	data = {
// 		...data,
// 		id: uid
// 	};
// 	return new Promise((resolve, reject) => {
// 		let ref = database.ref('items/' + uid);
// 		if(ref) {
// 			resolve(ref.set(data));
// 			console.log('add data succesed');
// 		} else {
// 			reject(console.log('add data failed'));
// 		}
// 	})
// };

const changeData = (id) => {
	return new Promise((resolve, reject) => {
		let ref = database.ref('items/' + id);
		console.log(ref);
		if(ref) {
			resolve(
				ref.once('value', function(snapshot) {
					let data = snapshot.val();
					console.log(data.done);
					ref.update({
						done: !data.done
					});
					console.log('change data succesed');
				})
			)
		} else {
			reject(console.log('change data failed'))
		}
	})
};

// const LogInWithGoogle = () => {

//   GoogleSignin.getAccessToken()
//               .then((token) => {
//                 let accessToken = firebase.auth.GoogleAuthProvider.credential(token);
//                 handleFirebaseLogin(accessToken);
//               })
//               .catch((err) => {
//               })
//               .done();
// }

// function handleFirebaseLogin(accessToken, options) {
//   firebase.auth()
//           .signInWithCredential(accessToken)
//           .then(function(data) {
//             let user = firebase.auth().currentUser;
//           })
//           .catch(function(error) {
//                         var errorCode = error.code;
//             let errorMessage = error.message;
//             let email = error.email;
//             let credential = error.credential;
//             if (errorCode === 'auth/account-exists-with-different-credential') {
//               // Email already associated with another account.
//             }
//           })
// }

export { getData, addData, changeData };