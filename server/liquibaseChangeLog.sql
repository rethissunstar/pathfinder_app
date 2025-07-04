--liquibase formatted sql
--changeset users.create:1 
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  permission ENUM('admin', 'dm', 'player') DEFAULT 'player',
  email VARCHAR(255),
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  status BOOLEAN DEFAULT TRUE,
  theme ENUM('light', 'dark') DEFAULT 'light',
  language VARCHAR(10) DEFAULT 'en',
  updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  profile_pic VARCHAR(255) DEFAULT '',
  guild VARCHAR(255) DEFAULT '',
  party VARCHAR(255) DEFAULT ''
);
--changeset friends.create:1 dbms:mysql splitStatements:false
CREATE TABLE friends (
  friend_id INT AUTO_INCREMENT PRIMARY KEY,
  requestor_id INT NOT NULL,  -- The user who made the request
  friend_user_id INT NOT NULL, -- The user who received the request
  status ENUM('pending', 'accepted', 'rejected', 'removed') DEFAULT 'pending',
  FOREIGN KEY (requestor_id) REFERENCES users(user_id),
  FOREIGN KEY (friend_user_id) REFERENCES users(user_id)
  
);

--changeset messages.create:1 dbms:mysql splitStatements:false
CREATE TABLE messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,  -- The user who sent the message
  receiver_id INT NOT NULL,  -- The user who received the message
  content TEXT NOT NULL,  -- The message content
  date_sent DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when message was sent
  status ENUM('unread', 'read', 'archived') DEFAULT 'unread',  -- Status of the message
  conversation_id INT DEFAULT NULL,  -- Thread ID (for grouping messages)
  parent_message_id INT DEFAULT NULL,  -- Message ID that this one is replying to (if any)
  FOREIGN KEY (sender_id) REFERENCES users(user_id),
  FOREIGN KEY (receiver_id) REFERENCES users(user_id),
  FOREIGN KEY (conversation_id) REFERENCES messages(message_id),  -- Referencing the same table for the conversation
  FOREIGN KEY (parent_message_id) REFERENCES messages(message_id)  -- Referencing the original message in the thread
  
);

--changeset friends.constraint:1 dbms:mysql splitStatements:false
ALTER TABLE friends ADD CONSTRAINT unique_friend_pair UNIQUE (requestor_id, friend_user_id);


--changeset messages.index:1 dbms:mysql splitStatements:false
CREATE INDEX idx_sender_receiver_conversation ON messages (sender_id, receiver_id, conversation_id);

