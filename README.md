# Airbnb Clone

This project is a full-stack Airbnb clone, replicating core features of the popular vacation rental platform. It provides a comprehensive booking system where users can browse, search, and reserve properties, while hosts can list their own spaces. Built using modern web technologies, the project demonstrates the implementation of key functionalities like user authentication, property management, and a reviews system.

## Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Property Listings**: Users can browse available properties, view details, and filter results by title, category, and location.
- **Booking System**: Users can book properties with date selection and view their booking history.
- **Host Dashboard**: Hosts can add, edit, and manage their listings, including uploading property images and setting availability.
- **Search Functionality**: Integrated search feature with dynamic filtering options for properties based on title, category, and location.
- **Reviews & Ratings**: Users can leave reviews and ratings on properties they have booked.
- **Responsive Design**: Fully responsive UI ensuring seamless use on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, MUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Cloud storage for images (Firebase)
- **Deployment**: Vercel (Frontend) and (Backend)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmedtarek536/Airbnb.git
   ```

2. Install dependencies for both client and server:

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Start the development servers:

   - **Frontend**: `npm run dev` (in the `Frontend` directory)
   - **Backend**: `npm start` (in the `Backend` directory)

## Screenshots

_Include screenshots of key features such as property listings, search filters, and booking flow._

## Live Demo
https://airbnb-opal-five.vercel.app/

## Future Improvements

- Implement real-time chat between users and hosts.
- Add a map view to browse properties by location.
- Introduce additional payment gateways for global support.
- Allow users to save favorite properties.

