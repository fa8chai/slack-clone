import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from "@material-ui/core";
import { auth, db } from '../firebase';
import firebase from "firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ roomId, roomName, chatRef }) {

    const [ input, setInput ] = useState('');
    const [user] = useAuthState(auth);

    const sendMessage = (e) => {
        e.preventDefault();
        if(!roomId) {
            return false
        }
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL,
            email: user?.email,
        });
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
        setInput('');
    };
    return (<ChatInputContainer>
        <form>
            <input value={input} onChange={e => setInput(e.target.value)}
            placeholder={`Message #${roomName}`} />
            <Button hidden type="submit" onClick={sendMessage}>
                SEND
            </Button>
        </form>
    </ChatInputContainer>)
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative;
        display: flex;
        justify-content: center
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 15px;
        outline:  none;
    }

    > form > button {
        display: none !important;
    }
`;
