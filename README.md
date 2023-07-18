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

## User Profile Application Built with Nest.js

This repository contains a User Profile application built with Nest.js, a progressive Node.js framework. The application provides authentication and email verification features, along with a user dashboard where users can update their profile information and set an avatar. The frontend part of the application is also implemented using Node.js.

As part of the additional task, avatars are automatically generated in three different sizes: original, medium, and small. You can verify and check this functionality by inspecting the network tab in your browser's developer tools while uploading a new image. The application will make requests to generate and retrieve the avatar images in the respective sizes. You can examine the request responses in the network tab to see the URLs and confirm that the avatars are generated in the expected sizes.

### Installation

To install the necessary dependencies, navigate to the root of the project and run the following command:

```bash
npm install
```

### Running the App

After the installation process, use these commands to run the app:

```bash
$ npm run start

# watch mode
$ npm run start:dev
```

### Deploying the App

The application is hosted and can be accessed through the following [link](http://185.166.216.70:4322).

### Time Spent

The development of this project took approximately 5 days. It involved learning and implementing Nest.js from scratch, as well as completing the required and additional tasks.

Please feel free to explore the code, provide feedback, and track the time spent on the project.
