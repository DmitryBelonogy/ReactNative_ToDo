/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import thunk from 'redux-thunk';
import reducer from './lib/reducers';
import {
  Platform,
  StyleSheet,
  Text,
	View,
	ScrollView
} from 'react-native';
import About from './components/About';
// import LogIn from './components/LogIn';
import ToDo from './components/ToDo';

const store = createStore(reducer, applyMiddleware(thunk));

class ToDoApp extends Component {
  render() {
    return (
      <NativeRouter>
          <ScrollView style={styles.container}>
            <View style={styles.nav}>
              <Link to='/' style={styles.navItem}>
                <Text style={styles.text}>toDo List</Text>
              </Link>
              <Link to='/about' style={styles.navItem}>
                <Text style={styles.text}>About</Text>
              </Link>
            </View>
            <Route exact path="/" component={ToDo} />
            <Route path="/about" component={About} />
          </ScrollView>
        </NativeRouter>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <NativeRouter>
          <View>
            <Route path="/toDo" component={ToDoApp} />
            <Route path="/login" component={LogIn}/>
            <Redirect from="/" to="/login"/>
          </View>          
        </NativeRouter>  */}
        <ToDoApp />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
	nav: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	navItem: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		margin: 5,
		backgroundColor: 'aqua'
	},
	text: {
		fontSize: 20,
		fontWeight: "600"
	}
})
