CREATE TABLE CUSTOMER(
	CustomerID INT,
	NameCustomer VARCHAR(15) NOT NULL,
	LastNameCustomer VARCHAR(15) NOT NULL,
	PassCustomer VARCHAR(15) NOT NULL,
	Email VARCHAR(35) NOT NULL UNIQUE,
	Phone INT NOT NULL,
	StudentID INT UNIQUE,
	University VARCHAR(20),
	Miles INT DEFAULT 0,
	PRIMARY KEY (CustomerID)
	
);

CREATE TABLE WORKER(
	WorkerID INT,
	NameWorker VARCHAR(15) NOT NULL,
	LastNameWorker VARCHAR(15) NOT NULL,
	PassWorker VARCHAR(15) NOT NULL,
	PRIMARY KEY (WorkerID)
);

CREATE TABLE PLANE(
	PlaneID CHAR(6),
	Model VARCHAR(10) NOT NULL,
	PassengerCap INT NOT NULL,
	BagCap INT NOT NULL,
	PRIMARY KEY (PlaneID)

);

CREATE TABLE FLIGHT(
	FlightID CHAR(7),
	BagQuantity INT DEFAULT 0,
	UserQuantity INT DEFAULT 0,
	Gate INT NOT NULL,
	Departure TIMESTAMP NOT NULL, 
	Arrival TIMESTAMP NOT NULL,
	Origin CHAR(50) NOT NULL,
	Destination CHAR(50) NOT NULL,
	Stops TEXT[],
	Status TEXT,
	Price INT,
	Discount INT DEFAULT 0,
	PlaneID CHAR(6) DEFAULT 000000,
	WorkerID INT DEFAULT 000000000,
	PRIMARY KEY (FlightID),
	FOREIGN KEY (WorkerID) REFERENCES WORKER(WorkerID),
	FOREIGN KEY (PlaneID) REFERENCES PLANE(PlaneID)
);

CREATE TABLE BAG(
	BagID CHAR(10),
	Weight INT,
	Color TEXT,
	CustomerID INT,
	FlightID CHAR(7),
	PRIMARY KEY (BagID),
	FOREIGN KEY (CustomerID) REFERENCES CUSTOMER(CustomerID),
	FOREIGN KEY (FlightID) REFERENCES FLIGHT(FlightID)
);

CREATE TABLE Customer_in_Flight(
	SeatNum CHAR(3),
	CustomerID INT,
	FlightID CHAR(7),
	FOREIGN KEY (CustomerID) REFERENCES CUSTOMER(CustomerID),
	FOREIGN KEY (FlightID) REFERENCES FLIGHT(FlightID),
	PRIMARY KEY (CustomerID, FlightID)
);






