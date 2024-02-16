-- Active: 1708107622480@@127.0.0.1@3306@hulucommon
CREATE DATABASE huluCommon;

-- Create CompaniesRole Table
CREATE TABLE IF NOT EXISTS companyRoles (
    companyRoleId INT PRIMARY KEY AUTO_INCREMENT, companyRoleName VARCHAR(255) NOT NULL
);

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    userId INT PRIMARY KEY AUTO_INCREMENT, userEmail VARCHAR(255) NOT NULL, firstName VARCHAR(255) NOT NULL, middleName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, userPhone VARCHAR(255), createdDate DATETIME, OTP VARCHAR(255), activeStatus INT
);

-- Create UsersRole Table
CREATE TABLE IF NOT EXISTS usersRole (
    userRoleId INT PRIMARY KEY AUTO_INCREMENT, userId INT, companyRoleId INT, FOREIGN KEY (userId) REFERENCES users (userId), FOREIGN KEY (companyRoleId) REFERENCES companyRoles (companyRoleId)
);

-- Create UsersPassword Table
CREATE TABLE IF NOT EXISTS usersPassword (
    userPasswordId INT PRIMARY KEY AUTO_INCREMENT, userId INT, userPassword VARCHAR(255), createdDate DATETIME, FOREIGN KEY (userId) REFERENCES users (userId)
);

-- Create ContactVerification Table
CREATE TABLE IF NOT EXISTS contactVerification (
    contactVerificationId INT PRIMARY KEY AUTO_INCREMENT, userId INT, emailStatus BOOLEAN, phoneStatus BOOLEAN, FOREIGN KEY (userId) REFERENCES users (userId)
);

-- Create UsersProfile Table
CREATE TABLE IF NOT EXISTS usersProfile (
    userProfileId INT PRIMARY KEY AUTO_INCREMENT, userId INT, firstName VARCHAR(255), middleName VARCHAR(255), lastName VARCHAR(255), createdDate DATETIME, FOREIGN KEY (userId) REFERENCES users (userId)
);

-- Create UsersPictures Table
CREATE TABLE IF NOT EXISTS usersPictures (
    userPictureId INT PRIMARY KEY AUTO_INCREMENT, userId INT, imageUrl VARCHAR(255), createdDate DATETIME, pictureVisibility INT, FOREIGN KEY (userId) REFERENCES users (userId)
);

-- Create Conversations Table
CREATE TABLE IF NOT EXISTS conversations (
    conversationId INT PRIMARY KEY AUTO_INCREMENT, userOneId INT, userTwoId INT
);

-- Create Messages Table
CREATE TABLE IF NOT EXISTS messages (
    messageId INT PRIMARY KEY AUTO_INCREMENT, conversationId INT, senderId INT, createdDate DATETIME, seen INT, FOREIGN KEY (conversationId) REFERENCES conversations (conversationId)
);

-- Create Message Content Table
CREATE TABLE IF NOT EXISTS messageContent (
    messageContentId INT PRIMARY KEY AUTO_INCREMENT, messageId INT, messageText VARCHAR(255), FOREIGN KEY (messageId) REFERENCES messages (messageId)
);

-- Create MessageImages Table
CREATE TABLE IF NOT EXISTS messageImages (
    messageImagesId INT PRIMARY KEY AUTO_INCREMENT, messageContentId INT, imageUrl VARCHAR(255), FOREIGN KEY (messageContentId) REFERENCES messageContent (messageContentId)
);