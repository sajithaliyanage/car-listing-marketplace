# car-listing-marketplace

Welcome to the Car Listing Marketplace service!

The Car Listing Marketplace service is built with NodeJS and ExpressJS. It leverages a PostgreSQL database with Sequelize as the ORM to provide a robust and scalable solution. Key features of the server include:

- **User Authentication:** JWT is employed for secure user authentication, ensuring the safety of user credentials. Tokens expire after 30 days.
- **User Sessions:** Cookies are used to manage user sessions.
- **Password Security:** User passwords are salted and hashed.
- **Default Admin User:** The app comes pre-configured with a default admin user account (username: `admin@carmarketplace.com` and password: `Admin@123`).
- **Search/Filter and Pagination Support:** API supports search and filter capabilities for cars, including pagination.
- **Booking Integration:** Car listings dynamically reflect whether a car has been booked by someone, displaying relevant booking dates.

## Getting Started

Please follow the below steps to run the service.

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) & [Node](https://nodejs.org/en) & [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

2. Clone the Repository
    ```sh
    git clone https://github.com/sajithaliyanage/car-listing-marketplace.git
    cd car-listing-marketplace
    ```
3. Import postman collection


### Run Server in Docker Environment

4. Run docker compose
    ```sh
    docker-compose -f docker-compose.yml up --build
    ```

5. Use postman defined endpoints to access services

### Run Server Locally

4. Start Postgress server locally
    ```sh
    docker run -d --name marketplace-postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=postgres -e POSTGRES_DB=car_marketplace -p 5432:5432 postgres:latest
    ```

5. Install dependencies
    ```sh
    cd api
    npm install
    ```
6. Run server
    ```sh
    npm run dev
    ```
7. Use postman defined endpoints to access services

## API Specification

### Auth

- **POST /api/v1/auth/signin:**
  - *Purpose:* Login with credentials.
  
- **POST /api/v1/auth/signup:**
  - *Purpose:* Register new users.
  
- **GET /api/v1/auth/signout:**
  - *Purpose:* Logout.

### Users

- **GET /api/v1/users:**
  - *Purpose:* Get all users (admin only).
  
- **PATCH /api/v1/users/:userId/mark-as-admin:**
  - *Purpose:* Make a user an admin (admin only).

### Cars

- **POST /api/v1/cars:**
  - *Purpose:* Add cars to the listing (admin only).
  
- **GET /api/v1/cars:**
  - *Purpose:* Search and filter cars with pagination.
  - *Query Parameters:*
    - `search[brand]=<>`
    - `search[model]=<>`
    - `filter[color]=<>`
    - `filter[year]=<>`
    - `filter[minPrice]=<>`
    - `filter[maxPrice]=<>`
    - `filter[minMileage]=<>`
    - `filter[maxMileage]=<>`
    - `filter[minYear]=<>`
    - `filter[maxYear]=<>`
    - `page=<>`
    - `limit=<>`
  
- **GET /api/v1/cars/:carId:**
  - *Purpose:* Get car details by ID.

### Booking

- **POST /api/v1/bookings:**
  - *Purpose:* Make a car booking for a specific date if the car is available.
  
- **GET /api/v1/bookings/:referenceNumber:**
  - *Purpose:* Get a booking by reference number.
  
- **DELETE /api/v1/bookings/:referenceNumber:**
  - *Purpose:* Cancel a booking if made not less than 24 hours ago.
