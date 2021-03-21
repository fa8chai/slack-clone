import React from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase';
import { useDispatch, useSelector } from "react-redux";
import { enterRoom, selectRoomId } from '../features/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from "firebase";

function SidebarOption({ id, Icon, title, addChannelOption }) {
    const dispatch = useDispatch();

    const roomId = useSelector(selectRoomId);
    const [user] = useAuthState(auth);
    const [ messagesCount ] = useCollection(id && db.collection("rooms").doc(id).collection("messages"))

    const addChannel = () => {
        const channelName = prompt("Please enter the channel name");
        if(channelName) {
            db
            .collection("rooms").add({
                name: channelName,
                owner: user?.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } 
    };
    const selectChannel = () => {
        if(id) {
            dispatch(enterRoom({roomId: id}))
        }
    };

    return (<SidebarOptionContainer
        onClick={addChannelOption ? addChannel : selectChannel}
    >
        {Icon && <Icon fontSize='small' style={{padding: 10}} />}
        {Icon ? (
            <h3>{title}</h3>
        ) : (
            <SidebarOptionChannel>
                <div className={roomId == id && "active"}>
                    <span>#</span> {title}
                </div>
                {messagesCount?.size > 0 && 
                    <div className='count'>
                    {messagesCount?.size}
                    </div>
                }
                
            </SidebarOptionChannel>
        )}
    </SidebarOptionContainer>)
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
    }
    > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 5px;
    font-weight: 300;

    > .active {
        color: green;
    }
    > .count {
        background-color: gray;
        border-radius: 100px;
        padding: 2px;
        
    }

`;