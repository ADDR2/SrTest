CREATE DATABASE Sr_Test;
CREATE USER Sr_Amaro WITH PASSWORD '5r_4m4r0';

\connect Sr_Test

CREATE SCHEMA IF NOT EXISTS Sr_Amaro AUTHORIZATION Sr_Amaro;
GRANT CREATE ON DATABASE Sr_Test to Sr_Amaro;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA Sr_Amaro TO Sr_Amaro;
GRANT USAGE ON SCHEMA Sr_Amaro TO Sr_Amaro;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA Sr_Amaro TO Sr_Amaro;
GRANT SELECT, INSERT, UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER ON ALL TABLES IN SCHEMA Sr_Amaro  TO Sr_Amaro;
ALTER DATABASE Sr_Test OWNER TO Sr_Amaro;
CREATE EXTENSION postgis;