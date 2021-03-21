import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from './ChatInput';
import { useSelector } from "react-redux";
import { selectRoomId } from '../features/appSlice';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
import Spinner from "react-spinkit";

function Chat() {
    const chatRef = useRef(null);

    const roomId = useSelector(selectRoomId);

    const [ roomDetails ] = useDocument(roomId && db.collection("rooms").doc(roomId))

    const [ roomMessages, loading ] = useCollection(roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc"))
    
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [roomId, loading])

    
    if(loading) {
        return (
            <MessagesLoading>
                <Spinner
                    name="ball-spin-fade-loader"
                    color="purple"
                    fadeIn="none"
                />
            </MessagesLoading>
        )
    }
    return (<ChatContainer>
        {roomDetails && (
          <>
          <Header>
              <HeaderLeft>
                  <h4><strong>#{roomDetails?.data().name}</strong></h4>
                  <StarBorderOutlinedIcon />
              </HeaderLeft>
  
              <HeaderRight>
                  <p>
                      <InfoOutlinedIcon />
                  </p>
              </HeaderRight>
          </Header>
      
          <ChatMessages>
              {roomMessages?.docs.map(doc => {
                  const { message, timestamp, user, userImage } = doc.data();
  
                  return (
                      <Message
                          key={doc.id}
                          message={message}
                          timestamp={timestamp}
                          user={user}
                          userImage={userImage}
                      />
                  )
              })}
          <ChatButtom ref={chatRef} />
          </ChatMessages>
  
          <ChatInput
              roomId={roomId}
              roomName={roomDetails?.data().name}
              chatRef={chatRef}
          />
      </>  
        )}
    </ChatContainer>)
}

export default Chat

const MessagesLoading = styled.div`
    flex: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChatButtom = styled.div`
    padding-bottom: 200px;
`;

const ChatMessages = styled.div`

`;
const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;
const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        display:flex;
        text-transform: lowercase;
        margin-right: 10px
    }
    > h4 > .MuiSvgIcon-root {
        font-size: 18px;
    }
`;