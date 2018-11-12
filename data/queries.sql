CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
  lName VARCHAR(30) NOT NULL,
  username VARCHAR(50) NOT NULL PRIMARY KEY,
  passwrd VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

INSERT INTO Users(fName, lName, username, passwrd, country, gender, email)
VALUES
  ('Alejandro', 'Paez', 'apaez', 'hola', 'MEX', 'Masculine', 'a01192304@itesm.mx'),
  ('Juan', 'Martinez', 'juan', 'hola', 'MEX', 'Masculine', 'juan@itesm.mx'),
	('Pamela', 'Rodriguez', 'thePam22', '22mapeht', 'MEX', 'Feminine', 'pam@itesm.mx');

CREATE TABLE Likes (
  username VARCHAR(50) NOT NULL,
  photoID INT NOT NULL,
  likeID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FOREIGN KEY (photoID) REFERENCES Images(photoID),
  FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Images (
  username VARCHAR(50) NOT NULL,
	photoID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tittle TEXT NOT NULL,
  cat1 VARCHAR(50),
  cat2 VARCHAR(50),
  cat3 VARCHAR(50),
  img TEXT NOT NULL,
  rating int default 1400,
  FOREIGN KEY (username) REFERENCES Users(username)
);
