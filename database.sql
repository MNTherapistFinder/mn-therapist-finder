CREATE DATABASE "mn_therapist_finder"

-- -- You need to first install postgis onto your computer, you can use "brew install postgis" if you use homebrew
-- package manager for macOS

CREATE EXTENSION postgis;


CREATE TABLE "therapists"
(
    "id" serial PRIMARY KEY,
    "full_name" VARCHAR(50),
     "email" varchar(80) NOT NULL UNIQUE,
     "password" varchar(240) NOT NULL,
    "profile_picture" VARCHAR(500),
    "biography" VARCHAR(1500) ,
    "workplace_street_address" VARCHAR(100),
    "workplace_zipcode" INT,
    "workplace" GEOGRAPHY    
     -- GEOGRAPHY datatype is a datatype specific to postgis
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "qualifications"
(
    "id" serial PRIMARY KEY,
    "years_in_practice" INTEGER ,
    "school" VARCHAR(100) ,
    "year_graduated" INTEGER,
    "license_number" INTEGER,
    "license_state" VARCHAR(50)

)
WITH (
  OIDS=FALSE
);


CREATE TABLE "therapists_qualifications"
(
    "id" serial PRIMARY KEY,
    "therapists_id" integer REFERENCES therapists,
    "qualifications_id" integer REFERENCES qualifications
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "issues"
(
    "id" serial PRIMARY KEY,
    "issue_name" VARCHAR(50)
)
WITH (
  OIDS=FALSE
);


CREATE TABLE "therapists_issues"
(
    "id" serial PRIMARY KEY,
    "therpaists_id" INTEGER references therapists,
    "issues_id" INTEGER references issues
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "specialties"
(
    "id" serial PRIMARY KEY,
    "specialty_name" VARCHAR(100)
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "therapists_specialties"
(
    "id" serial PRIMARY KEY,
    "specialties_id" integer REFERENCES specialties,
    "therapists_id" integer REFERENCES therapists
)
WITH (
  OIDS=FALSE
);


CREATE TABLE "appointment"
(
    "id" serial PRIMARY KEY,
    "therapist_id" INTEGER REFERENCES therapists,
    "start_time" TIMESTAMP,
    "end_time" TIMESTAMP,
    "confirmed" BOOLEAN DEFAULT 'false',
    "pending" BOOLEAN DEFAULT 'false'
)
WITH (
  OIDS=FALSE
);


CREATE TABLE "availability"
(
    "id" serial PRIMARY KEY,
    "therapists_id" INTEGER REFERENCES therapists,
    "available_from" TIMESTAMP
)
WITH (
  OIDS=FALSE
);


CREATE TABLE "insurance_plans"
(
    "id" serial PRIMARY KEY,
    "insurance_name" VARCHAR(100)
)
WITH (
  OIDS=FALSE
);


CREATE TABLE "therapists_insurance_plans"
(
    "id" serial PRIMARY KEY,
    "insurance_plans_id" INTEGER REFERENCES insurance_plans,
    "therapists_id" INTEGER REFERENCES therapists
)
WITH (
  OIDS=FALSE
);




