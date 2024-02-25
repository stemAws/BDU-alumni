CREATE TABLE Alumni (
    alumniId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fullName VARCHAR(100),
    gender CHAR(1),
    email VARCHAR(100),
    phoneNumber VARCHAR(20),
    profilePicture VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

CREATE TABLE Custom (
    customId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT UNIQUE,
    constactInfo BOOLEAN DEFAULT 0,
    educationalBackground BOOLEAN DEFAULT 0,
    workExperience BOOLEAN DEFAULT 0,
    posts BOOLEAN DEFAULT 0,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Education (
    educationId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT,
    institution VARCHAR(100),
    degree VARCHAR(50),
    major VARCHAR(50),
    minor VARCHAR(50),
    admission VARCHAR(50),
    stillLearning BOOLEAN,
    graduatingYear DATE,
    awards VARCHAR(50),
    researchPublications TEXT,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

