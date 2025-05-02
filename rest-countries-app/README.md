# 🌍 REST Countries React App

This is a modern React frontend application that consumes the [REST Countries API](https://restcountries.com) to display data about countries around the world.

---

## ✨ Features

- 🔐 User Authentication (Firebase Auth: Email/Password + Google)
- 🌎 View all countries with details
- 🔍 Search countries by name
- 💱 Filter countries by currency
- 🧠 View detailed info (name, flag, capital, region, population, languages)
- ❤️ Add favorite countries (per user session)
- 🚫 Protected routes (only accessible after login)
- 🔄 Uses React Hooks and Context API

---

## 🔧 Tech Stack

- React (with Vite)
- Firebase (Auth)
- REST Countries API
- React Router
- Axios

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/rest-countries-app.git
cd rest-countries-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Firebase config

Create a `firebase.js` in `src/` and use your Firebase project credentials:

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

### 4. Run the app

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── api/               # Axios API wrappers
├── components/        # Reusable UI components
├── context/           # Auth Context
├── pages/             # Page components
├── routes/            # Protected Route
├── App.jsx
├── firebase.js
└── main.jsx
```

---

## ✅ TODO

- [ ] Add styling (Tailwind / Bootstrap)
- [ ] Deploy on Firebase Hosting or Vercel
- [ ] Add loading spinners / error handling
- [ ] Add tests (Jest + React Testing Library)

---

## 📄 License

MIT

---

## 🔗 Submission Info

- Hosted App URL: **(to be added)**
- GitHub Repo: **(to be added)**

```

---
```
