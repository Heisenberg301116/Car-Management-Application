# Car Management System

## Overview
The Car Management System is an application designed to help users manage their car listings. It allows users to:
1) Create, View, Edit, and Delete Car Listings: Users can easily add new cars, update details, view them, or remove them from the system.
2) Car Details: Each car listing includes up to 10 images, a title, a description, and tags such as car type, company, and dealer.
3) User Authentication: The system features secure user authentication, ensuring that users can only manage their own car listings.
4) Search Functionality: Users can search for cars using various ways, such as car type, company, or dealer.

## Architecture
The Car Management System follows a client-server architecture with a RESTful API. The application is structured to have a clear separation between the frontend and backend, where:

1) Frontend: The user interface (UI) interacts with the backend through HTTP requests. It provides the necessary interfaces for managing car listings and performing actions like creating, viewing, editing, and deleting cars.
2) Backend: The backend consists of a REST API that handles requests related to user authentication, car management, and search functionality. It communicates with the database and ensures the proper business logic and data validation.

## Technologies Used
The Car Management System is built using the MERN stack (MongoDB, Express.js, React, Node.js), providing a scalable platform for modern web applications. Key technologies include:

1) MongoDB: NoSQL database for storing car listings, user data, and related information.
2) Express.js: Web framework for building the backend REST API.
3) React: JavaScript library for creating dynamic, responsive frontend interfaces.
4) Node.js: Runtime environment powering the backend and client-server communication.
5) Cloudinary: Integrated for image storage and URL generation, allowing users to upload and display car images.
6) Swagger: Used for generating and managing API documentation.

## Database Design
The Car Management System uses MongoDB as its database, which is structured around two main entities: Car and User. The relationships between these entities are captured using references (ObjectIds) to maintain the system’s integrity.

Key Entities: 
a) User
i) email: Stores the user's email address, which is unique for each user.
ii) password: Stores the hashed password for user authentication.

b) Car
i) title: A string representing the car's title.
ii) description: A string providing a detailed description of the car.
iii) images: An array of strings where each string is the URL of an image associated with the car (up to 10 images).
iv) tags: An array of strings used to categorize the car (e.g., car type, company, dealer).
v) user_id: A reference to the User schema, linking each car to the user who owns or manages it. This ensures that users can only manage their own car listings.

## Setup
1) Clone the repo into local system.
2) Move into client folder and install the required packages from package.json.
3) Then create a .env file inside client folder and specify the following variable: REACT_APP_SERVER_BASE_URL=`http://localhost:8080`
4) Then move into the server folder and install the required packages from package.json.
5) Then create a .env file inside server folder and specify the following variables:
      - MONGO_PASSWORD=`Your MongoDB Cluster Password`
      - MONGO_USERNAME=`Your MongoDB Cluster Username`
      - PORT=8080
      - JWT_SECRET=`Specify any complex JWT key such as: d82a2e4c14f3f8b7c9a6d8f72c1e8ba9c3d6e4b5a2f1d3c8a1b6f7e8c9d0e3a2`
      - CLOUDINARY_CLOUD_NAME=`Your Cloudinary cloud name where you will store images`
      - CLOUDINARY_API_KEY=`Your Cloudinary API key`
      - CLOUDINARY_API_SECRET=`Your Cloudinary API secret`
7) That's all. Now run the client and server.
