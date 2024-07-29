CREATE TABLE Person (
    personId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fullName VARCHAR(100),
    gender CHAR(1),
    email VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    verified BOOLEAN,
    isAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE Alumni (
    alumniId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    personId INT UNIQUE NOT NULL,
    currentLocation VARCHAR(255),
    phoneNumber VARCHAR(20),
    profilePicture VARCHAR(255),
    coverPicture VARCHAR(255),
    bio TEXT,
    isNotable BOOLEAN,
    socialMedia TEXT,
    FOREIGN KEY (personId) REFERENCES Person(personId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE WebsiteAdmin (
    adminId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    personId INT UNIQUE,
    role TEXT, 
    FOREIGN KEY (personId) REFERENCES Person(personId)
);

CREATE TABLE Custom (
    customId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT UNIQUE,
    showPhoneNumber BOOLEAN DEFAULT 0,
    recieveNewsLetter BOOLEAN DEFAULT 1
);

CREATE TABLE Education (
    educationId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT,
    institution VARCHAR(100),
    degree VARCHAR(50),
    major VARCHAR(50),
    minor VARCHAR(50),
    admission VARCHAR(50),
    graduatingYear INT,
    awards VARCHAR(50),
    researchPublications TEXT,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
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
);

CREATE TABLE Post (
    postId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT,
    content TEXT,
    mediaPath VARCHAR(255),
    suggestedByAdmin BOOLEAN,
    suggestToAdmin BOOLEAN, 
    location VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
);

CREATE TABLE News (
    newsId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    title VARCHAR(100),
    content TEXT,
    category VARCHAR(50),
    imagePath VARCHAR(255),
    location VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
);

CREATE TABLE Event (
    eventId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    title VARCHAR(100),
    content TEXT,
    startDate DATE,
    endDate DATE,
    organizer VARCHAR(100),
    eventLink VARCHAR(255),
    imagePath VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
);

CREATE TABLE JobPosting (
    jobPostingId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    personId INT,
    jobTitle VARCHAR(100),
    description Text,
    companyName VARCHAR(100),
    companyAddress VARCHAR(255),
    peopleNeeded INT,
    deadline Date,
    email VARCHAR(100),
    phoneNumber VARCHAR(20),
    salary INT,
    imagePath VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (personId) REFERENCES Person(personId),
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    employmentType VARCHAR(255),
    isApproved BOOLEAN,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
);

CREATE TABLE Chapters (
    chapterId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    chapterName VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Feedback (
    feedbackId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20),
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)  
);

CREATE TABLE Gallery (
    galleryId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(255),
    media VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)  
);

CREATE TABLE Donation (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,

    adminId INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
);


