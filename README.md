# newsletter-website-template

## Languages, Tools, and Libraries/Packages
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

## [Click Here for a Video Demo](https://www.youtube.com/watch?v=BZeJ6P40W_Q)

Or view some quick screenshots of the app and read more below:

![messy-gallary](https://github.com/lukarh/newsletter-website-template/assets/65103724/d34106d8-da13-4b6d-97b7-fa3820060367)

## About

This project is a full-stack mock newsletter website developed using MERN (MongoDB, Express.js, ReactJS, Node.js) stack, Axios for seamless API endpoint communication, Formik for efficient form handling and submission, Stripe for subscription and payment management, and industry-standard file structure. For the file structure, the directory is composed of two main folders, one for the client and one for the server, each respectively containing logic for the front-end and back-end. The server-side structure features folders such as controllers, config, middleware, and more such to define various parameters and settings for the application, hold logic for handling incoming requests and generating appropriate responses, and create API endpoint routes. The client-side folder structure incorporates folders such as contexts, components, scenes, and other essential folders.

With this website, users can find themselves experiencing all the essential user functionalities, including secure login/logout, registration, and hassle-free subscription management. This works thanks to intuitive and visually appealing front-end design implemented using PrimeReact UI components. Stripe Integration with the website ensures a smooth experience for users to choose, update, and manage their subscriptions. Furthermore, this website also includes a basic-working framework of a shop and cart functionality, that has yet to be fully fleshed out, using CartContext - a context hook, making it easy for users to browse and add products to their cart. Lastly, the website also makes API calls to NewsAPI to populate the main home page with the top most recent headlines in the United States, allowing the users to have access to the latest and most relevant headlines on the website.

Overall, this project was a great learning experience to gain familiarity on how to adhere to modern development practices, how to full-stack develop a website from scratch, and how to build software using relevant functionalities found across many developed websites. 

## Development

- Code: JavaScript using MERN Stack
- Framework: React.js
- Database: MongoDB
- Back-End: Express.JS, Passport.JS, Axios
- Front-End: PrimeReact, a React UI component library
- APIs: Stripe, NewsAPI, MailTrap
- Additional: HTML, CSS, Styled Components

  `` test ``

## File Structure - Organized in Industry-Styled Format
- **Client Folder:**
  -   public
  -   src
    - components
    - contexts
    - data
    - scenes
    - styles
    - App.css
    - App.js
- **Server Folder:** 
  - config
  - controllers
  - middleware
  - models
  - routes
  - services
  - server.js
    
## Deployment
In a terminal at this directory, run the following command to install all necessary libraries / packages:

## Not Included

`.env` file is not included, which contains the secret and publishable key from Stripe, as well as developer API keys/credentials for MailTrap and NewsAPI

## Available Scripts

In the project directory, you can run:

### `cd client` then `npm start` to run Client

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `cd server` then `nodemon` to run Server

Runs the server locally on port 4000.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


