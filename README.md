# Plates Co - Sales System (POC)  

This project is a proof of concept (POC) for Plates Co's new sales system. It includes core functionalities such as adding products to basket, applying special offers, calculating delivery charges, and returning the total cost of the order.

Additionally, the system offers various endpoints for managing products, offers, delivery cost, and baskets. A comprehensive list of available endpoints, along with their request/response formats, can be explored through the integrated Swagger documentation. 

---

## Tech Stack  
- **Backend:** [NestJS](https://nestjs.com/) (Node.js, TypeScript)  
- **Database:** Sequelize as an ORM with SQLite  
- **Testing:** Jest  
- **Documentation:** Swagger  

---

## Installation  

### 1. Clone the repository  
```bash
git clone https://github.com/fakharrana/plates-co-sales-system
cd plates-co-sales-system
```

### 2. Install dependencies 
```bash
npm install
```

### 3. Set up environment variables (.env)
```bash
NODE_ENV=development
PORT=3000

```

### 4. Setup Database (Migrations and Seeds) 
```bash
npm run db:setup
```
---

## Usage 

### 1. Development Mode  
```bash
npm run start:dev
```

### 2. Production Mode
```bash
npm run build
npm run start:prod
```
---

## Running Tests

### 1. Run All Tests 
```bash
npm run test
```

### 2. Check Test Coverage
```bash
npm run test:cov
```
---

## Database Resetting
Incase you face any issues with database you can run:

```bash
npm run db:reset
```
---

## API Endpoints

Swagger api docs are being used, you can access them by:
- http://localhost:3000/api-docs

---

## Assumptions
- No auth mechanism is required
- Product codes are case-sensitive.
- The special offer applies only to Red plates and cannot be combined with other offers.
- Delivery charges are applied based on the final subtotal after discounts.
- There is only one basket, which persists until manually cleared (using an endpoint) since this is a POC.

---

## Key Highlights
- **NestJS**: Chosen for its modular architecture and use of design patterns.
- **Sequelize ORM**: Used for database interactions with SQLite as the database.
- **Testing**: Comprehensive test coverage using Jest.
- **Logging**: Context-based logging implemented with a custom NestJS interceptor.
- **Exception Handling**: Global error handling using a custom exception filter.
- **API Documentation**: Usage of swagger for easy usage of api endpoints.

## Project Structure
```bash
config
migrations
seeders
database.sqlite
src
├── modules
│   ├── basket
│   │   ├── basket.controller.ts
│   │   ├── basket.model.ts
│   │   ├── basket.service.ts
│   │   └── basket.service.spec.ts
├── common
│   ├── enums
│   │   ├── environment.enum.ts
│   ├── filters
│   │   ├── all-exceptions.filter.ts
│   ├── interceptors
│   │   ├── context.interceptor.ts
├── __mocks__
│   ├── basket.mock.ts
├── main.ts
├── app.module.ts

```

## Evaluation Notice

This repository is intended solely for the evaluation of the provided solution.  
Unauthorized reproduction, distribution, or use of this code beyond the evaluation process is strictly prohibited.  


