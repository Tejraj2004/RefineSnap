# 🎨 RefineSnap – AI Background Removal  

RefineSnap is a sleek AI-powered web app that lets users remove image backgrounds instantly with just one click. It features **Razorpay integration first and foremost**, allowing users to purchase credits and subscriptions seamlessly for image processing. Built using the MERN stack, it also integrates with the **Clipdrop API** for high-quality, fast, and reliable background removal.  

Whether you're a designer, content creator, or just need quick transparent images — RefineSnap makes it effortless while showcasing smooth payment handling with Razorpay.  

---

## 🚀 Overview  
✨ A simple yet powerful platform where:  

- 💳 Users can purchase credits via **Razorpay** to process images  
- 📤 Upload any image (JPG/PNG)  
- ✂️ Background is instantly removed with AI precision using **Clipdrop API**  
- 📂 Download the processed image directly in seconds  
- 💻 Clean and responsive UI for smooth usage  

---

## 🧰 Tech Stack & Tools Used  

| Category       | Tools / Libraries             |  
|----------------|-------------------------------|  
| Frontend       | React.js, Tailwind CSS, Vite  |  
| Backend        | Node.js, Express.js           |  
| Database       | MongoDB + Mongoose            |  
| API Handling   | Axios, RESTful Endpoints      |  
| Payment Gateway| **Razorpay**                  |  
| Authentication | Clerk.dev (optional)          |  
| Deployment     | Render                        |  
| Version Control| Git, GitHub                   |  

---

## 🎯 Key Features  

👤 For Users  
- 💳 Purchase credits and subscriptions with **Razorpay** (simulate payment success for testing)  
- 📂 Upload images in JPG/PNG format  
- ✨ AI-based background removal using **Clipdrop API**  
- 📥 One-click image download after processing  
- 📱 Fully responsive UI  

🛠️ For Developers  
- ⚡ Lightweight MERN setup  
- 🔄 Easy integration with external AI APIs  
- 💸 Razorpay integration for subscription and credits  
- 🧹 Clean codebase for quick customization  

---

## 💳 Subscription & Credits  

Users can purchase credits to process images. Three subscription plans are available:  

| Plan       | Credits | Price (USD) |  
|------------|--------|-------------|  
| Basic      | 100    | $10         |  
| Advanced   | 500    | $50         |  
| Business   | 5000   | $250        |  

- Credits are consumed each time an image is processed.  
- Razorpay payment gateway is used for purchasing credits.  
- Payment success is simulated in development for testing image upload.  

## 📦 Prerequisites  

Make sure the following tools are installed before running the project:  

- Node.js (v16+)  
- MongoDB (Local or MongoDB Atlas)  
- Git  
- npm (comes with Node.js)  
- Razorpay account (for live payments)  

---

## ⚡ Installation & Run Commands  

### 1️⃣ Clone the Repository  
| Command | Description |  
|---------|-------------|  
| `git clone https://github.com/your-username/refinesnap.git` | Clone the repository |  
| `cd refinesnap` | Navigate to the project directory |  

### 2️⃣ Frontend Setup (React + Vite)  
| Command | Description |  
|---------|-------------|  
| `cd client` | Navigate to frontend folder |  
| `npm install` | Install frontend dependencies |  
| `npm run dev` | Run frontend in development mode |  

### 3️⃣ Backend Setup (Express + MongoDB)  
| Command | Description |  
|---------|-------------|  
| `cd server` | Navigate to backend folder |  
| `npm install` | Install backend dependencies |  
| `nodemon server.js` | Run backend server with nodemon |  

---

## 🌟 Final Note  
RefineSnap isn’t just a background remover — it’s a step toward making **design effortless and accessible for everyone**. With its clean interface, AI power, and subscription-based credit system via **Razorpay**, your images are always ready for the spotlight. ✨  
