import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import axios from 'axios';
import { setAvatarRoute } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';

const Container = styled('div')({
  backgroundImage: 'linear-gradient(to bottom right, #242025, #242025)',
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  overflow: 'auto',
  color: '#efd3c8',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '3rem',
});

const Avatars = styled.div`
  display: flex;
  gap: 2rem;
  .selected {
    border: 0.4rem solid #efd3c8;
    height: 100px;
  }
`;

const Avatar = styled('div')({
  border: '0.4rem solid transparent',
  padding: '0.4rem',
  borderRadius: '5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: '0.5s ease-in-out',
});

const Image = styled('img')({
  height: '6rem',
});

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const api = 'https://api.multiavatar.com/45678945';
  let navigate = useNavigate();

  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    const login = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else if (localStorage.getItem('chat-app-user').isAvatarImageSet) {
        navigate('/');
      }
    };
    login().catch(console.error);
  }, [navigate]);

  const setProfilePic = async () => {
    if (selectedAvatar === undefined) {
      toast.error('please select an avatar!', toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      await axios
        .post(`${setAvatarRoute}/${user.id}`, {
          image: avatars[selectedAvatar],
        })
        .then(
          () => {
            user.isAvatarImageSet = true;
            user.avatarImage = avatars[selectedAvatar];
            localStorage.setItem('chat-app-user', JSON.stringify(user));
            navigate('/');
          },
          () => {
            toast.error(
              'error setting avatar. please try again!',
              toastOptions
            );
          }
        );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Container>
      <ToastContainer></ToastContainer>
      <div>
        <h1>pick an avatar!</h1>
      </div>
      <Avatars>
        {avatars.map((avatar, index) => {
          return (
            <Avatar
              key={index}
              className={`${selectedAvatar === index ? 'selected' : ''}`}
            >
              <Image
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                onClick={() => setSelectedAvatar(index)}
              />
            </Avatar>
          );
        })}
      </Avatars>
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          background: '#efd3c8',
          borderRadius: '10px',
          width: '25%',
          color: '#242025',
          height: '40px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          fontFamily: 'Roboto Mono',
          ':hover': {
            bgcolor: '#efd3c8',
            color: 'white',
          },
        }}
        onClick={setProfilePic}
      >
        set as profile picture
      </Button>
    </Container>
  );
}

export default SetAvatar;
