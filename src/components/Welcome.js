import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

function Welcome() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const curUser = async () => {
      if (localStorage.getItem('chat-app-user')) {
        setUserName(
          await JSON.parse(localStorage.getItem('chat-app-user')).username
        );
      }
    };
    curUser().catch(console.error);
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>welcome {userName}!</h1>
      <h3>select a chat to start!</h3>
    </Container>
  );
}

export default Welcome;
