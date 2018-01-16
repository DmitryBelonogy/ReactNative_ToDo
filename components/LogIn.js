import React, { Component } from 'react';
// import { LogInWithGoogle } from '../lib/firebase/firebase';

import {
	Platform,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';

export default class LogIn extends Component {

	handleGoogleLogin = () => {
		// LogInWithGoogle();
	}

	render() {
		return (
			<View>
				<Button
					onPress={this.handleGoogleLogin}
					title="Log In"
					color="#841584"
				/>
			</View>
		)
	}
}