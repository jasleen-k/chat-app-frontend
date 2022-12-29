import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: '85% 15%',
  overflow: 'hidden',
  background: '#1c181c',
});

const Avatars = styled.div`
  overflow: auto;
  .selected {
    background: #141113;
  }
`;

const Avatar = styled('div')({
  padding: '7px',
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  alignItems: 'center',
});

const AvatarImg = styled('img')({
  padding: '0px 5px',
  height: '3rem',
});

const Admin = styled('div')({
  position: 'absolute',
  bottom: '0',
});

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <Avatars>
            {contacts.map((contact, index) => {
              return (
                <Avatar
                  className={`${selected === index ? 'selected' : ''}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <AvatarImg
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                  <p>{contact.username}</p>
                </Avatar>
              );
            })}
          </Avatars>
          <Admin>
            <Avatar>
              <AvatarImg
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
              <p>{currentUserName}</p>
            </Avatar>
          </Admin>
        </Container>
      )}
    </>
  );
}

export default Contacts;
