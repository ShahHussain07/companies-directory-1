# Companies Directory – Frontlines Media Assessment (React + Vite)
This is a professional, submission-ready React application built for the **Frontlines Media** assignment. It includes company listings, filters, sorting, pagination, and actions like “Visit Website” & “Contact”.

## 🌐 Live Demo (Netlify)
🔗 https://resplendent-meerkat-f77ed3.netlify.app/

## 📦 GitHub Repository
🔗 https://github.com/ShahHussain07/companies-directory-1

## 🚀 Features
- ⚛️ React (Vite) project — fast & lightweight
- 📱 Fully responsive UI
- 🔍 Search companies
- 🌍 Filter by **Location**
- 🏢 Filter by **Industry**
- 🔃 Sort by **Name (ASC/DESC)**
- 📄 Pagination (6 cards per page)
- 🌗 Light / Dark Mode toggle
- 📨 Visit website + Contact HR button
- 📁 Data from `public/companies.json`
- 🌐 Deployed using **Netlify**

## 🧩 Project Structure
src/  
  App.jsx — Main app logic (filters, pagination, theme)  
  components/  
    CompanyCard.jsx — UI card for each company  
    Filters.jsx — Search + dropdown filters  
    Pagination.jsx — Page buttons  
public/  
  companies.json — Company data  
vite.config.mjs — ESM config for Vite

## 💻 How to Run Locally
1. Install dependencies  
2. Start development server  
Open: http://localhost:5173  
3. Build for production  

## 🌐 Deployment
- Hosted on **Netlify**
- Build Command → `npm run build`
- Publish Directory → `dist/`
Live Site: https://resplendent-meerkat-f77ed3.netlify.app/

## 🎥 Submission Video (2–3 Minutes)
Your video should include:
1️⃣ Code Walkthrough  
- Project structure  
- Main files: App.jsx, CompanyCard.jsx, Filters.jsx  
- How pagination, search, and filtering work  
2️⃣ Demo of Working Features  
- Search  
- Sorting  
- Filters  
- Pagination  
- Contact HR button  
- Visit Website  
- Light/Dark Mode  
3️⃣ Approach Explanation  
- Why React + Vite  
- Why JSON as mock data  
- Why `useMemo` for optimized filtering  
- Why Netlify for quick deployment
