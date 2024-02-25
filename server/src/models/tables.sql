CREATE TABLE Person (
    personId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fullName VARCHAR(100),
    gender CHAR(1),
    email VARCHAR(100),
    phoneNumber VARCHAR(20),
    profilePicture VARCHAR(255),
    coverPicture VARCHAR(255),
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

CREATE TABLE News (
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

CREATE TABLE Event (
    eventId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    title VARCHAR(100),
    content TEXT,
    category VARCHAR(50),
    startDate DATE,
    endDate DATE,
    eventLocation TEXT,
    country VARCHAR(50),
    organizer VARCHAR(100),
    constactInfo Text,
    eventCapacity INT,
    featuredSpeakers VARCHAR(255),
    eventURL VARCHAR(255),
    registerURL VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mediaPath VARCHAR(255),
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE EventAttendance (
    eventAttendanceId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT,
    eventId INT,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (eventId) REFERENCES Event(eventId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE RSVPStatus (
    RSVPId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    eventAttendanceId INT,
    alumniId INT,
    eventId INT,
    confirmed BOOLEAN,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (eventId) REFERENCES Event(eventId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (eventAttendanceId) REFERENCES EventAttendance(eventAttendanceId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE JobPosting (
    jobPostingId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    alumniId INT,
    jobTitle VARCHAR(100),
    description Text,
    industry VARCHAR(50),
    companyAddress VARCHAR(255),
    employmentType VARCHAR(50),
    deadline Date,
    email VARCHAR(100),
    phoneNumber VARCHAR(20),
    linkedIn VARCHAR(255),
    offerStatus VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ProgramListing(
    programID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    programName VARCHAR(100),
    faculty VARCHAR(100),
    department VARCHAR(100),
    description Text,
    degree VARCHAR(20),
    admission VARCHAR(20),
    duration VARCHAR(100),
    tuition DOUBLE,
    constactInfo Text,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE   
);

CREATE TABLE MentorshipProgram (
    mentorshipProgramID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    adminId INT,
    programName VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    deadline DATE,
    startDate DATE,
    endDate DATE,
    programStatus VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    registerURL VARCHAR(255),
    contact VARCHAR(100), 
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Chapters (
    chapterId INT AUTO_INCREMENT PRIMARY KEY,
    alumniId INT NOT NULL,
    chapterName VARCHAR(255) NOT NULL,
    description TEXT,
    region VARCHAR(100),
    interestGroup VARCHAR(100),
    foundingDate DATE,
    presidentID INT,
    email VARCHAR(255),
    socialMedia VARCHAR(255),
    website VARCHAR(255),
    registerURL VARCHAR(255),
    count INT,
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE 
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE chapterMembers (
    chapterId INT,
    alumniId INT,
    status VARCHAR(255),
    PRIMARY KEY (chapterId, alumniId),
    FOREIGN KEY (chapterId) REFERENCES chapters(alumniId), 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (alumniId) REFERENCES alumni(alumniId)  
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Donations (
    campaignId INT AUTO_INCREMENT PRIMARY KEY,
    adminId INT,
    campaignName VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE volunteerOpportunity (
    opportunityId INT AUTO_INCREMENT PRIMARY KEY,
    adminId INT,
    description TEXT,
    location VARCHAR(255),
    startDate DATE,
    endDate DATE,
    contact VARCHAR(255),
    categories VARCHAR(20),
    status VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    noOfVolunteersNeeded INT,
    noOfVolunteersRegistered INT,
    registeringURL VARCHAR(255),
    FOREIGN KEY (adminId) REFERENCES WebsiteAdmin(adminId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE volunteers (
    volunteerId INT AUTO_INCREMENT PRIMARY KEY,
    opportunityId INT NOT NULL,
    alumniId INT NOT NULL,
    PRIMARY KEY (opportunityId, alumniId),
    FOREIGN KEY (alumniId) REFERENCES Alumni(alumniId), 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (opportunityId) REFERENCES volunteerOpportunity(opportunityId)  
        ON DELETE CASCADE
        ON UPDATE CASCADE
);















