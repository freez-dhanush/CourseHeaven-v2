# CourseHaven - Online Course Platform

![Course Heaven Logo](https://github.com/user-attachments/assets/baed42b3-34ad-4980-8d08-b29ca584ae9f)


CourseHaven is a full-stack web application built for selling and managing online courses. It features separate interfaces for users and administrators, secure payment processing with Stripe, and a modern, responsive design.

## Features

**User Features:**

* Browse available courses with details and pricing.
* User signup and login authentication.
* Securely purchase courses using Stripe (Credit/Debit Card).
* View purchased courses on a dedicated "Purchases" page.
* Responsive design for desktop and mobile viewing.

**Admin Features:**

* Separate admin signup and login.
* Admin dashboard for managing courses.
* Create new courses with title, description, price, and image upload.
* View all existing courses.
* Update course details (title, description, price, image).
* Delete courses.

## Screenshots

**Home Page:**
<img width="1875" height="910" alt="image" src="https://github.com/user-attachments/assets/6b46b1e9-95dd-48b8-83b1-141eba756320" />


**Courses Page (Dark Theme):**
<img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/51a6e67a-0e8f-47f8-89f3-41642844cfeb" />


**Checkout Page (Dark Theme):**
<img width="1918" height="914" alt="image" src="https://github.com/user-attachments/assets/27671540-77d9-47a3-9110-442cd038b8f4" />


**Admin Dashboard:**
<img width="1913" height="911" alt="image" src="https://github.com/user-attachments/assets/fa5c98c7-6f1d-45ec-8792-8be7686aa376" />


**Admin - Our Courses:**
<img width="1914" height="911" alt="image" src="https://github.com/user-attachments/assets/a26880ac-7663-44ad-9ad8-a60af7c4ce40" />


## Tech Stack

**Frontend:**

* **Framework:** React
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Payments:** Stripe React JS (@stripe/react-stripe-js)
* **UI Components:** React Icons, React Slick (for carousel)
* **Notifications:** React Hot Toast

**Backend:** *(Assuming Node.js/Express based on typical MERN stack)*

* **Framework:** Node.js, Express.js *(Update if different)*
* **Database:** MongoDB *(Update if different)*
* **Authentication:** JWT (JSON Web Tokens) *(Update if different)*
* **Payments:** Stripe API (Node.js library)
* **Image Storage:** Cloudinary / AWS S3 / Local Storage *(Specify which one)*

## Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn
* MongoDB instance (local or cloud)
* Stripe Account (for API keys)
* Cloudinary Account (or other image storage, if used)

### Installation & Setup

```bash
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

Backend Setup (Run in Terminal 1):
# From the project root (your-repository-name)
cd backend
npm install

# Create a .env file based on .env.example (if available)
# Add your MongoDB connection string, JWT secret, Stripe secret key, etc.
npm start # Or npm run dev

Frontend Setup (Run in Terminal 2):
# Open a new terminal
# From the project root (your-repository-name)
cd frontend
npm install

# Create a .env file if needed
# Add your VITE_STRIPE_PUBLISHABLE_KEY and VITE_BACKEND_URL
npm run dev


