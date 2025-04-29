# Shiro Online Store Project

A React Native-based grocery shopping application that allows users sign up and login, browse products and their details, manage cart and favorite products, place orders, and track order history. The app integrates with Firebase for authentication and real-time database.

[Watch the demo video](https://github.com/user-attachments/assets/796e255b-1474-4209-b679-091f3e27d089)

## Features

- **User Authentication**: Sign up and log in using Firebase Authentication.
- **Product Browsing**: View products categorized by type with detailed information.
- **Favorites**: Add or remove products from the favorites list.
- **Cart Management**: Add, remove, and adjust product quantities in the cart.
- **Order Placement**: Place orders and track order history.
- **Firebase Integration**: Real-time database for storing product data, user data including username, email, cart, favorites, and order history.

## Dependencies

- **React Native**: Framework for building native apps.
- **Expo**: Development platform for React Native.
- **Firebase**: Backend services for authentication and database.
- **React Navigation**: Navigation library for React Native.

## Project Structure

├── App.js # Main application entry point
├── Firebase-Config.js # Firebase configuration
├── src/
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── screens/ # Application screens
│ ├── utils/ # Utility functions
├── assets/ # Static assets
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

## Screens

- **Splash**: Initial loading screen.
- **Login**: User login screen.
- **Signup**: User registration screen.
- **Store**: Product browsing screen.
- **Product Details**: Detailed view of a product.
- **Favorites**: List of user's favorite products.
- **Cart**: User's shopping cart.
- **Order Confirmation**: Confirmation screen after placing an order.
- **Order History**: View user's past orders.

## Installation

1. Clone the repository:

   ```
   https://github.com/DozyXYZ/grocery_store_mobile.git
   cd grocery_project
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up .env file:

   - Create a .env file
   - Add the following configuration to the .env file:

   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyBRzHLbxikpsCMbuJfJXbC5upbNowh_FeA
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=groceryproject-fc76b.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://groceryproject-fc76b-default-rtdb.europe-west1.firebasedatabase.app/
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=groceryproject-fc76b
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=groceryproject-fc76b.firebasestorage.app
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=734130213283
   EXPO_PUBLIC_FIREBASE_APP_ID=1:734130213283:web:eeffdd839e1353bda08a16
   ```

4. Start the development server

   - Open a terminal (or PowerShell)
   - Go to the directory of the project

   ```
   npx expo start
   ```

5. Use the Expo Go app on your Android phone to scan the QR code printed on the terminal
