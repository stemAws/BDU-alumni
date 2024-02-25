CREATE TABLE Person (
    personId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fullName VARCHAR(100),
    gender CHAR(1),
    email VARCHAR(100),
    phoneNumber VARCHAR(20),
    profilePicture VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    bio TEXT
); 

CREATE TABLE Alumni (
    alumniId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    personId INT UNIQUE,
    currentLocation VARCHAR(255),
    isNotable BOOLEAN,
    recieveNewsletter BOOLEAN,
    socialMedia TEXT,
    privacySetting VARCHAR(10),
    verified BOOLEAN,
    FOREIGN KEY (personId) REFERENCES Person(personId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE WebsiteAdmin (
    adminId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    personId INT UNIQUE,
    role TEXT,
    isActive BOOLEAN,
    FOREIGN KEY (personId) REFERENCES Person(personId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
    graduatingYear DATE,
    awards VARCHAR(50),
    researchPublications TEXT,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Experience (
    experienceId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT,
    position VARCHAR(50),
    company VARCHAR(100),
    industry VARCHAR(50),
    startDate DATE,
    endDate DATE,
    description TEXT,
    employmentType VARCHAR(50),
    projects TEXT,
    stillWorking BOOLEAN,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Post (
    postId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT,
    content TEXT,
    mediaPath VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    likes INT,
    commentCounts INT,
    suggestToAdmin BOOLEAN,
    featured BOOLEAN,
    category VARCHAR(50),
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Comment (
    commentId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    postId INT UNIQUE,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES Post(postId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE news (
    newsId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    title VARCHAR(100),
    content TEXT,
    anouncementDate Date,
    category VARCHAR(50),
    mediaPath VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

