import React from 'react';
import {
	View,
	 Text,
} from 'react-native';
import Backend from '../Backend';
import { GiftedChat } from 'react-native-gifted-chat';


class Chat extends React.Component {
	state = {
		messages: []
	};
	//before rendering of component do this
	componentWillMount() {

	}

	render() {
		return (
			<GiftedChat 
				messages={this.state.messages}
				onSend={(message) => {
					//send message to your backend
					Backend.sendMessage(message);
				}}
				user={{
					_id: Backend.getUid(),
					name: this.props.name,
				}}
			/>

		);
	}

	componentDidMount() {
		Backend.loadMessages((message) => {
			this.setState((previousState) => {
				return {
					messages:GiftedChat.append(previousState.messages, message),
				};
			});
		});
	}

	componenyWillUnmount() {
		Backend.closeChat();
	}
}

Chat.defaultProps = {
	name: 'John',
};



export default Chat;