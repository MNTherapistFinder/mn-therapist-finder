
-----------------------------------------------------------------------------------

--------------------------DATABASE SET UP FROM SCRATCH ----------------------------

-----------------------------------------------------------------------------------
CREATE DATABASE "mn_therapist_finder"

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
    "workplace" GEOGRAPHY ,  -- GEOGRAPHY datatype is a datatype specific to postgis
    "years_in_practice" INTEGER,
    "school" VARCHAR(100),
    "year_graduated" INTEGER,
    "license_number" VARCHAR(100),
    "license_type" VARCHAR(100),
    "website" VARCHAR(100),
    "phone" VARCHAR(50),
    "is_active" BOOLEAN,
    "lng" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION   
    
);

CREATE TABLE "issues"
(
    "id" serial PRIMARY KEY,
    "issue_name" VARCHAR(50)
);

CREATE TABLE "therapists_issues"
(
    "id" serial PRIMARY KEY,
    "therpaists_id" INTEGER references therapists,
    "issues_id" INTEGER references issues
);

CREATE TABLE "specialties"
(
    "id" serial PRIMARY KEY,
    "specialty_name" VARCHAR(100)
);

CREATE TABLE "therapists_specialties"
(
    "id" serial PRIMARY KEY,
    "specialties_id" integer REFERENCES specialties,
    "therapists_id" integer REFERENCES therapists
);

CREATE TABLE "availability"
(
    "id" serial PRIMARY KEY,
    "therapists_id" INTEGER REFERENCES therapists,
    "available_from" TIMESTAMP
);

CREATE TABLE "insurance_plans"
(
    "id" serial PRIMARY KEY,
    "insurance_name" VARCHAR(100)
);

CREATE TABLE "therapists_insurance_plans"
(
    "id" serial PRIMARY KEY,
    "insurance_plans_id" INTEGER REFERENCES insurance_plans,
    "therapists_id" INTEGER REFERENCES therapists
);


---------------------------------------- INSERTING NECESSARY DATA-------------------------------------------

--------------------------ADDING ISSUES, SPECIALTIES AND HEALTH INSURANCE PLANS ----------------------------

------------------------------------------------------------------------------------------------------------

-- ADDING STUGGLES START
INSERT INTO "public"."issues"("issue_name") VALUES('Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('ADHD') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Adoption') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Alcohol Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Alzheimer''s') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Anger Management') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Antisocial Personality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Anxiety') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Asperger''s Syndrome') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Autism') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Behavioral Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Bipolar Disorder') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Borderline Personality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Career Counseling') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Child or Adolescent') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Chronic Illness') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Chronic Impulsivity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Chronic Pain') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Chronic Relapse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Codependency') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Coping Skills') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Depression') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Developmental Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Divorce') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Domestic Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Domestic Violence') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Drug Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Dual Diagnosis') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Eating Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Emotional Disturbance') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Family Conflict') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Gambling') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Grief') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Hoarding') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Infertility') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Infidelity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Intellectual Disability') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Internet Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Learning Disabilities') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Life Coaching') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Life Transitions') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Marital and Premarital') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Medical Detox') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Medication Management') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Men''s Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Narcissistic Personality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Obesity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Obsessive-Compulsive (OCD)') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Oppositional Defiance') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Parenting') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Peer Relationships') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Pregnancy, Prenatal, Postpartum') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Racial Identity') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Relationship Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('School Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Self Esteem') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Self-Harming') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Sex Therapy') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Sexual Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Sexual Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Sleep or Insomnia') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Spirituality') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Sports Performance') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Stress') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Substance Abuse') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Suicidal Ideation') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Teen Violence') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Testing and Evaluation') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Transgender') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Trauma and PTSD') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Traumatic Brain Injury') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Video Game Addiction') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Weight Loss') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Women''s Issues') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Mental Health') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Dissociative Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Elderly Persons Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Impulse Control Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Mood Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Personality Disorders') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Psychosis') RETURNING "id", "issue_name";
INSERT INTO "public"."issues"("issue_name") VALUES('Thinking Disorders') RETURNING "id", "issue_name";
-- ADDING STRUGGLES END

-- ADDING HEALTH INSURANCE PLANS (ONLY MN SPECIFIC) START
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Aetna') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Anthem') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Beech Street') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Behavioral Health Systems') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Blue Care Network') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('BlueCross and BlueShield') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Ceridian') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Cigna') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Great-West Life') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('HealthPartners') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Holman Group') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Magellan Behavioral Health') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Medica') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Medicaid') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('MHN') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Molina') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Multiplan') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('MVP') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('New Directions') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('Optum') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('PreferredOne') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('TRICARE') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('TriWest') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('UCare') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('UMR') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('UnitedHealthcare') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('ValueOptions') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('WellPoint') RETURNING "id", "insurance_name";
INSERT INTO "public"."insurance_plans"("insurance_name") VALUES('WPS') RETURNING "id", "insurance_name";
-- ADDING HEALTH INSURANCE PLANS (ONLY MN SPECIFIC) END

-- ADDING TREATMENT SPECIALTIES START
INSERT INTO "public"."specialties"("specialty_name") VALUES('Acceptance and Commitment Therapy (ACT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Adlerian') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Applied Behavioral Analysis') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Art Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Attachment-based') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Biofeedback') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Christian Counseling') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Cognitive Behavioral (CBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Compassion Focused') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Culturally Sensitive') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Dance/Movement Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Dialectical (DBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Eclectic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('EMDR') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Emotionally Focused') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Existential') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Experiential Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Expressive Arts') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Family / Marital') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Family Systems') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Feminist') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Forensic Psychology') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Gestalt') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Gottman Method') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Humanistic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Hypnotherapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Imago') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Integrative') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Internal Family Systems (IFS)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Interpersonal') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Intervention') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Jungian') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Mindfulness-based (MBCT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Motivational Interviewing') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Multicultural') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Narrative') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Neuro-Linguistic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Neurofeedback') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Parent-Child Interaction Therapy (PCIT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Person-Centered') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Play Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Positive Psychology') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Prolonged Exposure Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Psychoanalytic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Psychodynamic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Psychological Testing and Evaluation') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Rational Emotive Behavior Therapy (REBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Reality Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Relational') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Sand Play') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Solution Focused Brief (SFBT)') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Somatic') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Strength-Based') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Structural Family Therapy') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Supervision Services') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Transpersonal') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Trauma Focused') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Individuals') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Couples') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Family') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Group') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Video/Skype') RETURNING "id", "specialty_name";
INSERT INTO "public"."specialties"("specialty_name") VALUES('Video Counseling') RETURNING "id", "specialty_name";
-- ADDING TREATMENT SPECIALTIES END

------------------------------------------------------------------------------------------------------------

-------------------------------------MOCK DATA FOR LOCAL TESTING--------------------------------------------

------------------------------------------------------------------------------------------------------------

INSERT INTO "public"."therapists"("full_name", "email", "password", "profile_picture", "biography", "workplace_street_address", 
"workplace_zipcode", "workplace", "years_in_practice", "school", "license_type", "website", "is_active", "lng", "lat") 

VALUES('Sophie Weber', 'sophie@g.com', '$2a$10$sdCUVReJUcov/V6wxwiy6uPRslVC3HpkDQ50fGspZGCguoiSwaLXK', 
'https://cdn.filestackcontent.com/TRmQpYY4RwiJFjhqQZOF', 'I have been working with clients in the greater Minneapolis area for the past seven years. 
My approach to therapy is to make the experience driven by you, the client. How can we approach struggles you may be facing together? How can I help 
you take the healing journey you want to take?', '3611 Bryant Avenue South, Minneapolis, MN, USA', 55415, 
'SRID=4326;POINT(-93.290393 44.937278)', 5, 'University of Minnesota', 'Counselor, MFA, MA', 'www.liz-elton.com', 'TRUE', -93.290393, 44.937278),

 ('Oliva Griffin', 'oliva@g.com', '$2a$10$iX6s7YSs13L9ukikZC95FOW49dnrxpa06ZDXIP9d6AST/a/K1MHD2', 'https://cdn.filestackcontent.com/pyxq1BA7Tk6FAp3rE79V', 
 'I have been working with clients in the greater Minneapolis area for the past seven years. My approach to therapy is to make the experience driven by you, the client. 
 How can we approach struggles you may be facing together? How can I help you take the healing journey you want to take?', '4306 Bryant Avenue South, Minneapolis, MN, USA',
 55409, 'SRID=4326;POINT(-93.2910813 44.9247472)',5,'Stanford University', 'Clinical Social Work, MSW / LISCW','ogriffin.com', 'TRUE','(555)-555-5555', -93.29108129999997, 44.9247472),

  ('Patrick Parker', 'patrick.therapist.user@gmail.com', '$2a$10$dBlZ0uRuP/tUnxC/bmIDzuKhtR2X2FCS38a7kKyyEZVkxgDuSUAd6', 'https://cdn.filestackcontent.com/dpQhlwnRTq8mROfc2Rgw', 'Hello! I''m Patrick, 
  Ive been working in the mental health field for over ten years and have a diverse background. I''ve worked with kids, adolescents, adults and couples. I enjoy working with people to overcome obstacles 
  such as relational issues, chemical dependency issues, conflict, communication challenges, grief/loss, anxiety, and depression. I work from an integrative approach with clients, collaborating and teaching 
  techniques that can be used to combat problems long after formal treatment is complete.', '4500 Park Glen Road, Saint Louis Park, MN, USA',55409, 'SRID=4326;POINT(-93.337876 44.9435989)', 9, 'Argosy University', 
  'Licensed Marriage and Family Therapist', 'www.patrickparker.io', 'TRUE','(763) 226-9463', -93.337876, 44.9435989),


('Allison Reichard', 'ma@g.com', '$2a$10$4cYvAx.5lV/lYfcehIjM0OPA7xA1Lr.M64x/C.kG5npkLNd9VUfEW', 'https://cdn.filestackcontent.com/8In4SKjORT6BAeHTGwJ1', 'I am a warm, caring psychotherapist who has been practicing for 
over 20 years. I trained psychoanalytically at NYU Graduate School of Social Work, and have helped clients understand themselves and their behaviors so that they can enjoy their lives more fully. I work with adults and 
children individually as well as providing family and couples counseling.', '617 Jefferson St NE Minneapolis MN', 55413, 'SRID=4326;POINT(-98.25471 44.9956709)', 2, 'LMFT', 'areichard.com', 
'123-456-7890', 'FALSE', -93.25470999999999, 44.9956709),

 ('Carlos Gutierrez', 'pa@g.com', '$2a$10$nIvCnEWZwxcy15cHHqBoSu1w/tGqKnCRZEI4npPSSN5edEL25ZHGG', 'https://cdn.filestackcontent.com/8In4SKjORT6BAeHTGwJ1', 
 'I am a warm, caring psychotherapist who has been practicing for over 20 years. I trained psychoanalytically at NYU Graduate School of Social Work, and have 
 helped clients understand themselves and their behaviors so that they can enjoy their lives more fully. I work with adults and children individually as well as 
 providing family and couples counseling.', '617 Jefferson St NE Minneapolis MN', 55413, 'SRID=4326;POINT(-98.25471 44.9956709)', 11, 'University of Wisconsin La-Crosse', 
 1997, '1234', 'LMFT', 'cgutierrez.com', '123-456-7890', 'FALSE', -93.25470999999999, 44.9956709),

 ('Richard Liebner ', 'fa@g.com', '$2a$10$CzPEu6szo65r7pDjzSGEjOjCe8rEo0DK3.phKzvES3FXZLM3km0SG', 'https://cdn.filestackcontent.com/8In4SKjORT6BAeHTGwJ1', 'I am a warm, caring 
 psychotherapist who has been practicing for over 20 years. I trained psychoanalytically at NYU Graduate School of Social Work, and have helped clients understand themselves and their behaviors 
 so that they can enjoy their lives more fully. I work with adults and children individually as well as providing family and couples counseling.', '617 Jefferson St NE Minneapolis MN', 55413, 
 'SRID=4326;POINT(-98.25471 44.9956709)', 'University of Chicago', 1990, 'LMFT', 'rleibner.com', '123-456-7890', 'FALSE', -93.25470999999999, 44.9956709);

 -----------------------------------------------------------------------------------

-------------------------------- SAMPLE QUERIES -----------------------------------

-----------------------------------------------------------------------------------

--Query that gets all therapists that have Aetna as an available health insurance plan,
--they treat internet addiction, and they are based within a ten mile radius of Northeast Minenapolis
SELECT * FROM ( SELECT therapists.id,therapists.full_name, therapists.email, therapists.profile_picture, therapists.biography, 
                therapists.workplace_street_address, therapists.workplace_zipcode, therapists.workplace ,therapists.years_in_practice, therapists.school, 
                therapists.year_graduated, therapists.license_number, therapists.license_type, therapists.website, array_agg(DISTINCT insurance_plans.insurance_name) 
                AS insurance_plans, (SELECT 'Aetna' = ANY (array_agg(DISTINCT insurance_plans.insurance_name) ::varchar[])) AS query_in_insurance
                , array_agg(DISTINCT issues.issue_name) AS issues, (SELECT 'Internet Addiction' = ANY ( (array_agg(DISTINCT issues.issue_name)) ::varchar[])) AS query_in_issues,
                 array_agg(DISTINCT specialties.specialty_name) AS specialties, array_agg(DISTINCT availability.available_from) 
                AS available_times FROM therapists LEFT JOIN therapists_insurance_plans  ON therapists.id = therapists_insurance_plans.therapists_id 
                LEFT JOIN insurance_plans ON therapists_insurance_plans.insurance_plans_id = insurance_plans.id 
                LEFT JOIN therapists_issues ON therapists.id = therapists_issues.therapists_id LEFT JOIN issues ON therapists_issues.issues_id = issues.id 
                LEFT JOIN therapists_specialties ON therapists.id = therapists_specialties.therapists_id LEFT JOIN specialties ON therapists_specialties.specialties_id = specialties.id 
                LEFT JOIN availability ON therapists.id = availability.therapists_id 
                GROUP BY therapists.id, therapists.full_name, therapists.email, therapists.profile_picture, therapists.biography,
                therapists.workplace_street_address, therapists.workplace_zipcode, therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number) s 
                WHERE s.query_in_insurance = true and s.query_in_issues = true and ST_DWithin(s.workplace, ST_SetSRID(ST_MakePoint(-93.65470999999999,  44.6956709, 4326), 10 * 1609);


--Get all information for a therapist upon login to edit their information
SELECT therapists.full_name, therapists.email, therapists.profile_picture, 
      therapists.biography, therapists.workplace_street_address, therapists.workplace_zipcode, 
      therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number, therapists.license_type, therapists.website,therapists.is_active, therapists.lng, therapists.lat, therapists.phone,
      array_agg(DISTINCT insurance_plans.id) AS insurance_id, array_agg(DISTINCT issues.id) AS issueid, 
      array_agg(DISTINCT specialties.id) AS specialty_id FROM therapists LEFT JOIN therapists_insurance_plans 
      ON therapists.id = therapists_insurance_plans.therapists_id LEFT JOIN insurance_plans 
      ON therapists_insurance_plans.insurance_plans_id = insurance_plans.id LEFT JOIN therapists_issues 
      ON therapists.id = therapists_issues.therapists_id LEFT JOIN issues ON therapists_issues.issues_id = issues.id 
      LEFT JOIN therapists_specialties ON therapists.id = therapists_specialties.therapists_id LEFT JOIN specialties 
      ON therapists_specialties.specialties_id = specialties.id WHERE therapists.id =$1 GROUP BY
      therapists.full_name, therapists.email, therapists.profile_picture, 
      therapists.biography, therapists.workplace_street_address, therapists.workplace_zipcode, 
      therapists.years_in_practice, therapists.school, therapists.year_graduated, therapists.license_number, 
      therapists.license_type, therapists.website, therapists.is_active,therapists.lng, therapists.lat, therapists.phone;

--Get all available appointments for a logged in therapist
SELECT availability.id AS available_time_id, availability.available_from 
            AS available_times FROM availability JOIN therapists 
            ON therapists.id = availability.therapists_id where therapists.id = $1;

--Add an available appointment for a logged in therapist
INSERT INTO availability ("therapists_id", "available_from")
            VALUES (1, '2018-02-26 21:00:00-06');

--Delete an available appointment for a logged in therapist
DELETE FROM availability WHERE id = 1