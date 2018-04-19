import firebase from 'firebase';

class Backend{
	uid = '';
	messagesRef = null;

	//initialize Firebase Backend

	constructor() {
		firebase.initializeApp({
			apiKey: "AIzaSyCAWvSrZ83jtHdypd7abC8mMsZGLexdApc",
    authDomain: "chatapp-a669f.firebaseapp.com",
    databaseURL: "https://chatapp-a669f.firebaseio.com",
    storageBucket: "chatapp-a669f.appspot.com",
		});
	firebase.auth().onAuthStateChanged((user) => {
			if (user){
				this.setUid(user.uid);
			} else {
				firebase.auth().signInAnonymously().catch((error) => {
					alert(error.message);
				});
			}
		});
	}

	setUid(value) {
		this.uid = value;
	}

	getUid() {
		return this.uid;
	}

	// retrieve the messages from the Backend

	loadMessages(callback){
		this.messagesRef = firebase.database().ref('messages');
		this.messagesRef.off();
		const onReceive = (data) => {
			const message = data.val();
			callback({
				_id: data.key,
				text:message.text,
				createdAt: new Date(message.createdAt),
				user: {
					id: message.user.id,
					name:message.user.name,
				},
			});
		};
		this.messagesRef.limitToLast(20).on('child_added', onReceive);
	}

	sendMessage(message) {
		for (let i = 0; i < message.length; i++) {
			this.messagesRef.push({
				text:message[i].text,
				user:message[i].user,
				createdAt: firebase.database.ServerValue.TIMESTAMP,
			});
		}
	}

	closeChat() {
		if (this.messagesRef) {
			this.messagesRef.off();
		}
	}
}

export default new Backend();


