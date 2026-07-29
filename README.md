# Personal Finance Manager 💰

A full-stack personal finance application built to help users manage budgets, track expenses by category, and visualize their spending habits.

---

## 🚀 Features

* **User Authentication:** Secure user signup and login powered by JSON Web Tokens (JWT) and passwords hashed with bcrypt.
* **Budget Tracking:** Set monthly spending limits across custom categories.
* **Expense & Category Management:** Organize transactions efficiently with dedicated icons and categories.
* **Interactive Dashboard:** Data visualizations powered by Recharts to display spending breakdowns.
* **Environment-Aware Config:** Seamless transition between local development and production backends.

---

## 🛠️ Tech Stack

**Frontend:**
* React 19
* Vite
* React Router DOM v7
* Axios
* Recharts

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT) & bcrypt

**Deployment & CI/CD:**
* **Frontend:** Hosted on Vercel
* **Backend:** Hosted on Render

---

## 📁 Project Structure

```text
personal-finance-manager/
├── fe/
│   ├── src/
│   │   ├── components/
│   │   ├── css/
│   │   └── App.jsx
│   ├── .env.development
│   └── package.json
└── backend/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## 🔮 Future Enhancements

### Advanced Dashboard
* Date-based filtering
* Monthly and yearly analytics
* Custom financial reports

###  Budget Improvements
* Budget progress bars
Example: Food [████████░░ 85%] $510 / $600
* Budget notifications
* Spending predictions

### Additional Features
* Dark mode
* Mobile responsive design
* Recurring transactions
* Financial goals
* Transaction search and filters
* Export PDF & CSV reports
* Email monthly reports

 ## ⚙️ Local Setup & Installation
 ### Prerequisites
  * Node.js: v18 or higher
  * MongoDB: Local instance or MongoDB Atlas Cluster

1. Clone the repository

   ```
   git clone https://github.com/sonalk215/personal-finance-manager.git
   cd personal-finance-manager
   ```

2. Set up Backend

   ```
   cd be
   npm install
   ```

    Create a .env file in the backend directory:

     ```
     PORT=8080
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

     Start the backend server:

     ```
     npm start
     ```

 3. Set up Frontend

     ```
     cd ../fe
     npm install
     ```

      Create a .env.development file in the fe directory:

       ```
       VITE_API_URL=http://localhost:8080
       ```

       Start the Vite development server:
  
       ```
       npm run dev
       ```
