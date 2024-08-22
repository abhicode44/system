MERN Stack Banking Application Overview

This project is a comprehensive banking system designed to manage customer and banker interactions securely and efficiently. The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and incorporates role-based access with distinct functionalities for customers and bankers.

1. Customer Login :-
   
     Authentication:

     Login Page :- The login interface allows customers to sign in using their username/email and password.

     Access Token Generation :- Upon successful login, the server generates a unique 36-character alphanumeric access token. This token is used for authorization and 
     must be included in the Authorization header for all subsequent API requests made by the customer. This ensures secure communication between the client and 
     server.

   Transactions Page:

    Transaction Overview: After logging in, customers are redirected to a transactions page where they can view a detailed list of all their past transactions. 
    Each transaction entry includes the type of transaction (deposit or withdrawal), amount, date, and balance after the transaction.
   
    Deposit and Withdraw Functions: The page features Deposit and Withdraw buttons, allowing customers to manage their account balance.
   
    Popup Interface: Clicking on either button triggers a popup window displaying the customer's current balance and a numeric input field.
   
    Deposit Functionality: When a deposit amount is entered and confirmed, the system updates the customer's balance accordingly.
   
    Withdrawal Functionality: If a withdrawal amount is entered, the system checks the available balance. If the amount exceeds the current balance, an 
   "Insufficient Funds" message is displayed, preventing the transaction.

2. Banker Login:

   Login Page: Bankers log in using their username/email and password. The authentication mechanism is similar to the customer login, ensuring secure access.

   Accounts Page: After logging in, bankers are directed to the Accounts page, which displays an overview of all customer accounts. This page is designed for 
   managing and reviewing customer data.

How To Deploy This Project :-

step 1 :- git clone repository URL on your system 

step 2 :- install Node Module Packages for client and server folder 

step 3 :- Initialize node module pacakges using "npm init -y" command in Backend

step 4 :- Go to .env files and make necessary changes keys and values and make sure your Database URL is connected succesfully 

step 5 :- start the backend with command "node index.js"

step 6 :- frontend client folder give command "npm start"

Website Hosting on Render 

LIVE WEBSITE DEMO :- 
"https://bank-system-app.onrender.com/"
   
