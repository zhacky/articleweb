CREATE TABLE articles (
	ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE TEXT NOT NULL,
	DATE DATE DEFAULT CURRENT_DATE NOT NULL,
	SUMMARY BIG TEXT,
	CONTENT BIG TEXT,
	STATUS INT
);


