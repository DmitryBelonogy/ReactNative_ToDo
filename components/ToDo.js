import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../lib/firebase/firebase';
import {
	StyleSheet,
	Text,
	CheckBox,
	View
} from 'react-native';

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
if (date < 10) {
	date = '0' + date;
}
if (month < 9) {
	month = '0' + month;
}
const TODAY = year + '-' + month + '-' + date;

const List = ({id, done, title, date, priority, onToogleCheck}) => {
	return (
		<View key={id} style={styles.container}>
			<CheckBox style={styles.checkbox} value={done} onChange={() => onToogleCheck(id)} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.importance}>{priority === '1' ? 'важно' : ''}</Text>
		</View>
	)
}

class ToDo extends Component {

	constructor(props) {
		super(props);
		this.state = {showDone: true};
	}

	componentWillMount() {
		this.props.onGetData();
	}

	handleSort = () => {
		this.setState({showDone: !this.state.showDone});
	};

	handleCheck = (id) => {
		this.props.onToogleCheck(id);
	};

	render() {
		const today = new Date().getDate() + ' ' + months[new Date().getMonth()] + ' ' + new Date().getFullYear();
		let data;
		if (this.state.showDone === false) {
			data = this.props.store.filter(item => item.done === false);
		} else {
			data = this.props.store;
		}
		
		return (
			<View>
				<Text style={styles.today}>{today}</Text>
				<View style={styles.separate}></View>
				<View style={styles.container}>
					<CheckBox style={styles.checkbox} value={this.state.showDone} onChange={this.handleSort} />
					<Text style={styles.text}>Показывать выполненные</Text>
				</View>
				<View style={styles.separate}></View>
				<View style={styles.container}>
					<View style={styles.checkbox} />
					<Text style={styles.title_head}>Задача</Text>
					<Text style={styles.importance_head}>Важность</Text>
				</View>
				<View>
					{
						data.map((item, index) => {
							return (
								<List key={index} {...item} onToogleCheck={this.handleCheck} />
							)
						})
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	item: {
		height: 30,
		marginTop: 10,
		fontSize: 20
	},
	today: {
		fontSize: 25,
		textAlign: 'center',
		margin: 10,
	},
	checkbox: {
		flex: 1,
		height: 30,
		marginTop: 10,
		marginLeft: 10
	},
	title_head: {
		flex: 4,
		height: 30,
		marginTop: 10,
		fontSize: 20,
		fontWeight: "600"
	},
	importance_head: {
		flex: 2,
		height: 30,
		marginTop: 10,
		marginRight: 10,
		fontSize: 20,
		fontWeight: "600"
	},
	title: {
		flex: 4,
		marginTop: 10,
		fontSize: 20
	},
	importance: {
		flex: 2,
		marginTop: 10,
		marginRight: 10,
		fontSize: 20
	},
	text: {
		flex: 5,
		height: 30,
		marginTop: 10,
		fontSize: 20
	},
	separate: {
		height: 3,
		marginTop: 8,
		backgroundColor: 'grey'
	}
});

export default connect(	
	state => ({
		store: state.items.filter(item => item.date === TODAY)
	}),
	dispatch => ({
		onToogleCheck: (data) => {
			dispatch({type: 'TOOGLE_CHECK', payload: data})
		},
		onGetData: () => {
			dispatch(getData());
		}
	})
)(ToDo);