-- 🚨 Drop the database if it exists
DROP DATABASE IF EXISTS pathfinder_db;

-- 🆕 Create a fresh database
CREATE DATABASE pathfinder_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 🎯 Use the new database
USE pathfinder_db;

-- 🧱 Create the users table
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
