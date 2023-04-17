CREATE DATABASE clinic;

USE clinic;

CREATE TABLE Medic (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(50),
  password VARCHAR(50),
  email VARCHAR(255),
  birthdate DATE,
  cui VARCHAR(20),
  adress VARCHAR(255),
  phone VARCHAR(20),
  balance DECIMAL(10,2)
);

CREATE TABLE Patient (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(50),
  password VARCHAR(50),
  address VARCHAR(255),
  email VARCHAR(255),
  birthdate DATE,
  phone VARCHAR(20),
  cui VARCHAR(20),
  balance DECIMAL(10,2)
);

CREATE TABLE Admin (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(50),
  password VARCHAR(50),
  email VARCHAR(255),
  birthdate DATE,
  balance DECIMAL(10,2)
);

CREATE TABLE Laboratory (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(50),
  password VARCHAR(50),
  email VARCHAR(255),
  birthdate DATE,
  phone VARCHAR(20),
  cui VARCHAR(20),
  address VARCHAR(255)
);

CREATE TABLE Speciality (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2)
);

CREATE TABLE Medic_speciality (
  medic_id INT,
  speciality_id INT,
  PRIMARY KEY (medic_id, speciality_id),
  FOREIGN KEY (medic_id) REFERENCES Medic(id),
  FOREIGN KEY (speciality_id) REFERENCES Speciality(id)
);

CREATE TABLE Speciality_request (
  id INT PRIMARY KEY AUTO_INCREMENT,
  price DECIMAL(10,2),
  medic_id INT,
  name VARCHAR(255),
  description TEXT,
  FOREIGN KEY (medic_id) REFERENCES Medic(id)
);

CREATE TABLE Exam_request (
  id INT PRIMARY KEY AUTO_INCREMENT,
  price DECIMAL(10,2),
  laboratory_id INT,
  name VARCHAR(255),
  description TEXT,
  FOREIGN KEY (laboratory_id) REFERENCES Laboratory(id)
);

CREATE TABLE Laboratory_test (
  laboratory_id INT,
  test_id INT,
  PRIMARY KEY (laboratory_id, test_id),
  FOREIGN KEY (laboratory_id) REFERENCES Laboratory(id),
  FOREIGN KEY (test_id) REFERENCES Test(id)
);

CREATE TABLE Appointment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  medic_id INT,
  speciality_id INT,
  observations TEXT,
  report TEXT,
  status VARCHAR(50),
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  percentage INT,
  FOREIGN KEY (patient_id) REFERENCES Patient(id),
  FOREIGN KEY (medic_id) REFERENCES Medic(id),
  FOREIGN KEY (speciality_id) REFERENCES Speciality(id)
);

CREATE TABLE Test_appointment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  laboratory_id INT,
  percentage INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP,
  status VARCHAR(50),
  FOREIGN KEY (patient_id) REFERENCES Patient(id),
  FOREIGN KEY (laboratory_id) REFERENCES Laboratory(id)
);
