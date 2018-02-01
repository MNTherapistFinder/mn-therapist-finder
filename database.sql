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

ALTER TABLE qualifications
RENAME COLUMN license_state
TO license_type;

-- ADDING STUGGLES START
INSERT INTO "public"."issues"("issue_name") VALUES('Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' ADHD') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Adoption') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Alcohol Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Alzheimer''s') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Anger Management') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Antisocial Personality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Anxiety') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Asperger''s Syndrome') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Autism') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Behavioral Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Bipolar Disorder') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Borderline Personality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Career Counseling') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Child or Adolescent') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Chronic Illness') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Chronic Impulsivity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Chronic Pain') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Chronic Relapse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Codependency') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Coping Skills') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Depression') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Developmental Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Divorce') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Domestic Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Domestic Violence') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Drug Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Dual Diagnosis') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Eating Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Emotional Disturbance') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Family Conflict') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Gambling') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Grief') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Hoarding') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Infertility') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Infidelity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Intellectual Disability') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Internet Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Learning Disabilities') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Life Coaching') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Life Transitions') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Marital and Premarital') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Medical Detox') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Medication Management') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Men''s Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Narcissistic Personality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Obesity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Obsessive-Compulsive (OCD)') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Oppositional Defiance') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Parenting') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Peer Relationships') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Pregnancy, Prenatal, Postpartum') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Racial Identity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Relationship Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' School Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Self Esteem') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Self-Harming') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Sex Therapy') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Sexual Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Sexual Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Sleep or Insomnia') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Spirituality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Sports Performance') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Stress') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Substance Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Suicidal Ideation') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Teen Violence') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Testing and Evaluation') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Transgender') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Trauma and PTSD') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Traumatic Brain Injury') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Video Game Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Weight Loss') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Women''s Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Mental Health') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Dissociative Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Elderly Persons Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Impulse Control Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Mood Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Personality Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Psychosis') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES(' Thinking Disorders') RETURNING "id", "issue_name";
-- ADDING STRUGGLES END

-- Adding health insurance plans (only mn specific) start
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Aetna') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Anthem') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Beech Street') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' Behavioral Health Systems') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' Blue Care Network') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('BlueCross and BlueShield') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' Ceridian') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Cigna') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Great-West Life') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('HealthPartners') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Holman Group') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' Magellan Behavioral Health') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Medica') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' Medicaid') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('MHN') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Molina') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' Multiplan') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' MVP') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('New Directions') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Optum') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('PreferredOne') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('TRICARE') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' TriWest') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('UCare') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('UMR') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('UnitedHealthcare') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' ValueOptions') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('WellPoint') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES(' WPS') RETURNING "id", "insurance_name";
-- Adding health insurance plans (only mn specific) end


-- Adding treatment specialties  start
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Acceptance and Commitment Therapy (ACT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Adlerian') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Applied Behavioral Analysis') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Art Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Attachment-based') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Biofeedback') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Christian Counseling') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Cognitive Behavioral (CBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Compassion Focused') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Culturally Sensitive') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Dance/Movement Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Dialectical (DBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Eclectic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' EMDR') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Emotionally Focused') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Existential') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Experiential Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Expressive Arts') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Family / Marital') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Family Systems') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Feminist') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Forensic Psychology') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Gestalt') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Gottman Method') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Humanistic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Hypnotherapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Imago') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Integrative') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Internal Family Systems (IFS)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Interpersonal') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Intervention') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Jungian') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Mindfulness-based (MBCT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Motivational Interviewing') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Multicultural') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Narrative') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Neuro-Linguistic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Neurofeedback') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Parent-Child Interaction Therapy (PCIT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Person-Centered') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Play Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Positive Psychology') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Prolonged Exposure Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Psychoanalytic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Psychodynamic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Psychological Testing and Evaluation') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Rational Emotive Behavior Therapy (REBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Reality Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Relational') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Sand Play') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Solution Focused Brief (SFBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Somatic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Strength-Based') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Structural Family Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Supervision Services') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Transpersonal') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Trauma Focused') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Individuals') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Couples') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Family') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Group') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Video/Skype') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES(' Video Counseling') RETURNING "id", "specialty_name";
