DROP DATABASE bg_programming_skeleton;
CREATE DATABASE bg_programming_skeleton;
CREATE USER bg with encrypted password  '1234';
GRANT ALL PRIVILEGES ON DATABASE bg_programming_skeleton TO bg;
ALTER DATABASE bg_programming_skeleton OWNER TO bg;