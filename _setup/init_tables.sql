CREATE TABLE users
(
    id          SERIAL          PRIMARY KEY,
    email       VARCHAR(128)    NOT NULL UNIQUE,
    password    VARCHAR(128)    NOT NULL
);
