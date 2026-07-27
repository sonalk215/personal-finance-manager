# Personal Finance Manager 💰

A full-stack personal finance management application that helps users track income, expenses, manage categories, create monthly budgets, and visualize financial insights through interactive dashboards.

Built using modern technologies including React, Node.js, Express.js, MongoDB, JWT Authentication, and Recharts.

---

# Features 🚀

## Authentication

- User registration
- User login
- JWT based authentication
- Protected routes
- Persistent login using localStorage
- Logout functionality


---

# Dashboard 📊

A financial dashboard that provides users with a complete overview of their financial activity.

## Dashboard includes:

- Welcome user profile section
- Total income
- Total expenses
- Current balance
- Savings rate
- Recent transactions
- Expense distribution charts
- Income vs Expense comparison
- Savings trend visualization


## Charts

Implemented using Recharts.


### Expense Distribution - Pie Chart

Shows how expenses are distributed across categories.

Example:

Food        40%  
Rent        25%  
Travel      20%  
Shopping    15%


### Income vs Expense - Bar Chart

Compares monthly income and expenses.

Example:

Month        Income        Expense

January      $4000         $2000

February     $5000         $2500

March        $6000         $3000


### Savings Trend - Line Chart

Displays savings growth over time.


---

# Transactions 💳

Users can manage all financial transactions.

## Features

- Add transaction
- View transactions
- Edit transaction
- Delete transaction
- Associate transactions with categories
- Add notes
- Track transaction dates


## Transaction Types


### Income

Examples:

- Salary
- Bonus
- Freelance income


### Expense

Examples:

- Food
- Rent
- Shopping
- Travel


---

# Categories 🏷️

Users can organize transactions using custom categories.

## Features

- Create category
- View category list
- Update category
- Delete category
- Add category icons


Example:

🍔 Food

🏠 Rent

🚗 Travel

🛒 Shopping


---

# Monthly Budget 📅

Users can create monthly spending limits for different categories.

This module introduces business logic beyond simple CRUD operations.


## Features

- Create monthly budget
- View budgets
- Edit budget
- Delete budget
- Track spending against budget
- Calculate remaining amount
- Show overspending warnings


Example:

Category: Food

Budget:
$600

Spent:
$510

Remaining:
$90


Overspending Example:

Category: Food

Budget:
$600

Spent:
$720

Warning:
Budget exceeded!


---

# Technology Stack 🛠️


## Frontend

- React.js
- React Router
- Axios
- Recharts
- CSS3
- JavaScript ES6+


## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication


## Development Tools

- VS Code
- Git
- GitHub
- Postman


---

# Project Structure

personal-finance-manager
personal-finance-manager

├── frontend
│
│ ├── src
│ │
│ │ ├── components
│ │ │
│ │ ├── pages
│ │ │
│ │ ├── css
│ │ │
│ │ └── App.jsx
│ │
│ └── package.json
│
├── backend
│
│ ├── controllers
│ │
│ ├── models
│ │
│ ├── routes
│ │
│ ├── middleware
│ │
│ ├── config
│ │
│ └── server.js
│
└── README.md


---

# Backend API Endpoints

## Authentication

### Register User

POST /api/auth/register


### Login User

POST /api/auth/login


### Get Current User

GET /api/auth/me

Requires JWT authentication.

---

# Dashboard API

### Get Dashboard Summary

GET /api/dashboard/summary


Example Response:

{
  "totalIncome": 8000,
  "totalExpense": 5600,
  "balance": 2400,
  "savingRate": 30,
  "expenseByCategory": [],
  "recentTransactions": []
}


---

# Transaction APIs


### Get Transactions

GET /api/transactions


### Create Transaction

POST /api/transactions


### Update Transaction

PUT /api/transactions/:id


### Delete Transaction

DELETE /api/transactions/:id


---

# Category APIs


### Get Categories

GET /api/categories


### Create Category

POST /api/categories


### Update Category

PUT /api/categories/:id


### Delete Category

DELETE /api/categories/:id


---

# Budget APIs


### Create Budget

POST /api/budgets


### Get Budgets

GET /api/budgets


### Update Budget

PUT /api/budgets/:id


### Delete Budget

DELETE /api/budgets/:id


---

# Screens Implemented ✅

- Login Page
- Register Page
- Dashboard
- Transactions Page
- Add Transaction
- Edit Transaction
- Categories Management
- Monthly Budget Management


---

# Future Enhancements 🚀


## Advanced Dashboard

- Date based filtering
- Monthly and yearly analytics
- Custom financial reports


## Budget Improvements

- Budget progress bars

Example:

Food

████████░░ 85%

$510 / $600


- Budget notifications
- Spending prediction


## Reports

- Export PDF reports
- Export CSV files
- Email monthly reports


## Additional Features

- Dark mode
- Mobile responsive design
- Recurring transactions
- Financial goals
- Transaction search and filters


---

---

# Backend API Endpoints

## Authentication

### Register User

POST /api/auth/register


### Login User

POST /api/auth/login


### Get Current User

GET /api/auth/me

Requires JWT authentication.

---

# Dashboard API

### Get Dashboard Summary

GET /api/dashboard/summary


Example Response:

{
  "totalIncome": 8000,
  "totalExpense": 5600,
  "balance": 2400,
  "savingRate": 30,
  "expenseByCategory": [],
  "recentTransactions": []
}


---

# Transaction APIs


### Get Transactions

GET /api/transactions


### Create Transaction

POST /api/transactions


### Update Transaction

PUT /api/transactions/:id


### Delete Transaction

DELETE /api/transactions/:id


---

# Category APIs


### Get Categories

GET /api/categories


### Create Category

POST /api/categories


### Update Category

PUT /api/categories/:id


### Delete Category

DELETE /api/categories/:id


---

# Budget APIs


### Create Budget

POST /api/budgets


### Get Budgets

GET /api/budgets


### Update Budget

PUT /api/budgets/:id


### Delete Budget

DELETE /api/budgets/:id


---

# Screens Implemented ✅

- Login Page
- Register Page
- Dashboard
- Transactions Page
- Add Transaction
- Edit Transaction
- Categories Management
- Monthly Budget Management


---

# Future Enhancements 🚀


## Advanced Dashboard

- Date based filtering
- Monthly and yearly analytics
- Custom financial reports


## Budget Improvements

- Budget progress bars

Example:

Food

████████░░ 85%

$510 / $600


- Budget notifications
- Spending prediction

# Future Enhancements 🚀


## Advanced Dashboard

- Date based filtering
- Monthly and yearly analytics
- Custom financial reports


## Budget Improvements
- Budget progress bars

Example:
Food
████████░░ 85%

$510 / $600


- Budget notifications
- Spending prediction


## Additional Features

- Dark mode
- Mobile responsive design
- Recurring transactions
- Financial goals
- Transaction search and filters
- Export PDF reports
- Export CSV files
- Email monthly reports