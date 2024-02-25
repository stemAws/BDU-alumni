CREATE TABLE Alumni (
    alumniId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fullName VARCHAR(100),
    gender CHAR(1),
    email VARCHAR(100),
    phoneNumber VARCHAR(20),
    profilePicture VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE 
    lastLogin TIMESTAMP,
    currentLocation VARCHAR(255),
    bio TEXT,
    isNotable BOOLEAN,
    recieveNewsletter BOOLEAN,
    socialMedia TEXT,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    privacySetting VARCHAR(10),
    verified BOOLEAN
);
