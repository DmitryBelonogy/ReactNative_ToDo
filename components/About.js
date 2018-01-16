import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';

export default class About extends Component {
	render() {
		return (
			<View>
				<Text style={styles.about}>About</Text>
				<Text style={styles.text}>Приложение получает данные из DB Firebase и отображает задачи, установленные на сегодня</Text>
				<Text style={styles.text}>Разработал: Дима Б.</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  about: {
    fontSize: 25,
    textAlign: 'left',
    margin: 10,
  },
  text: {
    textAlign: 'left',
		fontSize: 16,
    margin: 10
  },
});