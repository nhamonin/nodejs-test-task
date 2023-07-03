# Backend Test Task

## 1. Research Task

During my research of the Express.js ecosystem, I focused on two critical areas for our next project: the admin panel implementation and handling of media files. I considered various solutions, seeking ones that provide robust functionality, flexibility, and strong community support.

### 1.1. Admin Panel Implementation

For the admin panel, I evaluated two options: **AdminJS** (via @adminjs/express) and **Forest Express** (via forest-express).

#### AdminJS

AdminJS provides an automatically generated and customizable admin interface that works seamlessly with both SQL and NoSQL databases.

**Pros:**

- Highly customizable to fit the project needs
- Built-in TypeScript declarations for improved development experience
- Solid community backing with 15k+ weekly npm downloads

**Cons:**

- May be too feature-rich for simpler applications
- The default UI might require customization for certain aesthetics

#### Forest Express

Forest Express is notable for handling complex data structures and relationships with a user-friendly UI.

**Pros:**

- Excellent for managing complex data
- Regular updates (last update was 3 days ago)

**Cons:**

- Does not include built-in TypeScript declarations
- Slightly less community support (around 6k weekly npm downloads)

After weighing the pros and cons, I recommend **AdminJS** for this project due to its flexibility, TypeScript support, and broader community acceptance.

### 1.2. Media Files Handling

For media files handling, I compared **Multer with Sharp** and **Cloudinary**.

#### Multer with Sharp

Multer handles multipart/form-data, primarily used for file uploads, and Sharp offers efficient image processing.

**Pros:**

- High configurability and efficiency
- Strong community backing

**Cons:**

- Does not include built-in support for cloud storage
- Limited to image processing

#### Cloudinary

Cloudinary is a comprehensive cloud service for media management.

**Pros:**

- All-in-one solution for media handling
- Supports various media types and manipulations

**Cons:**

- Paid service beyond the free tier
- Could be overkill for simpler media handling needs

After considering the trade-offs, I recommend **Multer with Sharp** for projects with basic media handling needs because of their efficiency and versatility.

### 1.3 Additional Packages

For every future Express.js project, I recommend incorporating the following additional packages, which improve the project's robustness and maintainability:

- **dotenv:** Manages environment variables, enhancing project security and configurability.
- **nodemon:** Boosts development productivity by automatically restarting the server after any file changes.
- **bcryptjs:** Secures user data by hashing and comparing passwords.
- **express-validator:** Provides middleware for validating and sanitizing input data, improving API reliability.
- **jsonwebtoken:** Manages user authentication and secure data exchange through tokens.
- **eslint:** Ensures code quality and consistency by enforcing predefined rules.
- **prettier:** Automates and enforces a consistent code formatting style.

### Time spent on this research: 2.5 hours

## 2. User Profile Application Built with Nest.js

This section is dedicated to a User Profile application that is built using the [Nest](https://github.com/nestjs/nest) framework.

## Description

The User Profile application is built on the Nest framework, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. This TypeScript starter repository provides the boilerplate for setting up the application.

### Installation

To install the necessary packages to run the application, use the following command:

```bash
npm install
```

### Running the App

After the installation process, use these commands to run the app:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Testing

For testing, you can use the following commands:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
