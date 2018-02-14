# MN Therapist Finder

MN Therapist Finder is a full-stack web application with the purpose of helping users find therapists in Minnesota who match their needs and connect with those therapists. The application includes a searchable directory of therapists generated through profile creation, as well as a schedule for users and therapists to connect for their first appointment.


## Built With

* AngularJS
* Node.js
* Express
* PostgreSQL
* PostGIS
* AngularJS Material
* Google Maps API
* Filestack
* Moment.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

<!-- See deployment for notes on how to deploy the project on a live system. -->

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostGIS](https://postgis.net/)


### Installing

- Install Postgres by running the following command:
```
brew install postgres
```

- Start your Postgres server by running the following command:
```
brew services start postgresql
```

- Install PostGIS by running the following command:
```
brew install postgis --build-from-source
```

- Execute `database.sql` file for basic database structure and mock data.

## Screen Shots

![Home Page](/server/public/images/documentation/homepage-1.png)

![Profile Dashboard](/server/public/images/documentation/profiledash-1.png)

![Therapist Schedule](/server/public/images/documentation/schedule-1.png)

## Documentation

- [MN Therapist Finder scope](https://goo.gl/H1cLaz)

![Early Wireframes](/server/public/images/documentation/IMG_6517.JPG)

![In-Process Features List](/server/public/images/documentation/IMG_6559.JPG)

### Completed Features

**Patient user features:**
- [x] **Home Page Search:** Allows users to search based on a few parameters to produce focused results.
- [x] **Directory/Search Results:** Initial home page search displays a carousel of the user's top five therapist matches. The full directory view provides unfiltered results and features a pop out sidebar for filtering.
- [x] **Therpist profile preview (modal):** Provides a brief summary of therapist's information.
- [x] **Therapist full profile view:** Shows full details of therapist profile and a link to schedule appointments.
- [x] **Appointment scheduler:** Displays a two week period of chosen therapist's availability. Prospective patient may click to request an appointment, add information, and an email will be sent to the therapist with the requested date, time and contact information.

**Therapist user features**
- [x] **Therapist register and login**
- [x] **Therapist profile dashboard:** Logged in therapists have access to an editable profile page where they can update a photo, add a biography, contact information, specialties, issues treated and accepted insurance.
- [x] **Therapist schedule view:** A custom scheduler where therapist can set available times which will populate the appointment options on the patient side.

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Admin login to deactivate and delete users, as well as confirm new user accounts.
- [ ] Map view of therapist locations.
- [ ] Social media sharing links for therapist profiles.

<!-- ## Deployment

Add additional notes about how to deploy this on a live system -->

## Authors

* Liz Elton
* Stephanie Ratanas
* Nasir Hussien 
* Joe Gagliano


## Acknowledgments

* Pagination code from Michael Bromley's [angularUtils](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination).
* Thank you to Chris Black and Kris Szafranski for the built-out authentication starting repository.
