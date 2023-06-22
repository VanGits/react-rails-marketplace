# Marketplace App

Welcome to the Marketplace App! This application is built using React.js on the frontend and Rails on the backend. This README file will guide you through the setup and functionality of the app.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Dependencies](#dependencies)
2. [Features](#features)
   - [Favorites](#favorites)
   - [Offer](#offer)
   - [Listing CRUD](#listing-crud)
   - [Search](#search)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)

## Getting Started

### Installation

To get started with the Marketplace App, follow these steps:

1. Clone the repository: `git clone https://github.com/VanGits/marketplace.git`
2. Change to the project directory: `cd client`
3. Install the required dependencies:
   - Backend:
     - Install Ruby dependencies: `bundle install`
   - Frontend:
     - Change to the frontend directory: `cd client`
     - Install Node.js dependencies: `npm install`

### Dependencies

The Marketplace App relies on the following dependencies:

#### Backend (Rails)

- Ruby
- Rails
- PostgreSQL

#### Frontend (React)

- Node.js
- React.js


Please ensure you have these dependencies installed before running the application.

## Features

### Favorites

The Favorites function allows users to save their favorite listings for easy access later. Users can mark a listing as a favorite by clicking on the Favorites button. To view their favorite listings, users can navigate to the Favorites page.

### Offer

The Offer feature enables users to make offers on listings. Users can specify the desired price and submit their offer through the app. The seller will receive a notification of the offer.

### Listing CRUD

Users have the ability to create, update, and delete their listings. They can create a new listing by providing details such as the item name, description, price, and upload relevant images. To update or delete a listing, users can navigate to the specific listing and choose the appropriate action.

### Search

The Search function allows users to find listings based on the item listing title.

## Usage

To run the Marketplace App, follow these steps:

1. Start the Rails server:
   - Start the server: `rails server`
2. Start the React development server:
   - Change to the frontend directory: `cd client`
   - Start the server: `npm start`



## License

The Marketplace App is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this application as per the terms of the license.

