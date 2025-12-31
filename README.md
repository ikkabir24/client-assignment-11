### Project Info

# Project Name:
LoanLink – Microloan Request & Approval Tracker System

# Purpose:
LoanLink is a full-stack microloan management platform designed to streamline loan applications, verification, approvals, EMI tracking, and repayments for small financial organizations, NGOs, and microloan providers.  
The goal of this project is to demonstrate strong full-stack development skills, secure authentication, role-based access control, and a clean, recruiter-friendly UI.

# Live URL:
https://assignment-11-auth-a379f.web.app/

# Key Features:
SPA Behavior: Fully responsive single-page application with smooth navigation and route reload stability.

Authentication & Authorization:
- Email/password login & registration
- Google login
- Role-based access (Admin, Manager, Borrower)
- Private routes protected using JWT/Firebase tokens stored in cookies

Loan Management:
- View all available loans
- Detailed loan information page
- Apply for loans with real backend integration
- Loan application tracking with status (Pending, Approved, Rejected)

Dashboards:
- Admin Dashboard:
  - Manage users (approve, suspend with reason)
  - Manage all loans
  - View and filter loan applications
- Manager Dashboard:
  - Add, update, delete loans
  - Approve or reject loan applications
  - View pending & approved loans
- Borrower Dashboard:
  - View applied loans
  - Cancel pending applications
  - Pay application fee and view payment details

Payment Integration:
- Stripe checkout with fixed $10 application fee
- Payment status update (Paid / Unpaid)
- Transaction details modal for completed payments

UI & UX:
- Modern, clean, recruiter-friendly design
- Light/Dark theme toggle
- Framer Motion animations
- Responsive layout for mobile, tablet, and desktop
- Toast/SweetAlert notifications for all actions
- Loading spinners and empty state handling

Additional Features:
- Pagination on selected pages
- Search and filter functionality
- Dynamic page titles
- Custom 404 Not Found page

# npm packages used:

Client Side:
- react
- react-dom
- react-router-dom
- tailwindcss
- daisyui
- framer-motion
- react-hook-form
- react-hot-toast
- swiper
- react-icons
- firebase
- axios

Server Side:
- express
- cors
- mongodb
- jsonwebtoken
- cookie-parser
- stripe
- dotenv