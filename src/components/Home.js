import React from 'react';
import {
	View,
	 Text,
	 StyleSheet,
	 TextInput,
	 TouchableOpacity,
} from 'react-native';
import {
	Actions,
} from 'react-native-router-flux';

class Home extends React.Component {
	state = {
		name:'',
	};
	render() {
		return (
			<View>
				<Text style={styles.title}>
				Enter your name:
				</Text>
				<TextInput
				style={styles.nameInput}
				placeholder='Name Here'
				onChangeText={(text) => {
					this.setState({
						name: text,
					});
				}}
				value={this.state.name}
				/>
				<TouchableOpacity
				onPress={() => {
					//navigate to the second screen and pass the name of screen
					Actions.chat({
						name: this.state.name,
					});
				}}
				>
				<Text style={styles.buttonText}>
					Next
				</Text>
				</TouchableOpacity>
			</View>

		);
	}
}

const styles = {
	title:{
		marginTop: 20,
		marginLeft: 20,
		fontSize: 20,
	},
	nameInput:{
		padding: 29,
		height: 40,
		borderWidth: 2,
		borderColor: 'black',
		margin: 20,
		color:'red',
	},
	buttonText:{
		marginLeft:20,
		fontSize: 20,
		height: 40,
	}
};




export default Home;