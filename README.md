# 🌍 Charity Social Network Frontend

A **Next.js 14** frontend for the charity & volunteering social network platform.  
This application provides a modern user interface, SEO optimization, real-time features, and integrates with the Node.js backend to connect users, manage charity projects/events, and enable donations via **ZaloPay**.

---

## ✨ Features

### 🛠️ Core UI/UX
- **Authentication & User Profiles**
    - Register / login with JWT (via backend API).
    - Profile page with edit info, avatar, and privacy settings.

- **Charity Projects & Events**
    - Create & manage charity projects.
    - Event calendar and volunteer participation.
    - Display project progress and updates.

- **Social Networking**
    - Interactive news feed: posts, likes, shares, comments.
    - Friend requests and friend suggestions.
    - Real-time chat powered by Firebase Firestore.

- **Donation System**
    - Intuitive donation flow integrated with **ZaloPay** API.
    - Transaction history and confirmation.

### ⚡ Real-time UI
- Firebase/WebSocket listeners for chat and notifications.
- Live updates for friend requests, donations, and event participation.

---

## 🏗️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router + Server Actions)
- **UI Library**: React 18, TailwindCSS / Shadcn UI
- **State Management**: React Query 5 + Context API
- **Authentication**: JWT (via backend API)
- **Realtime**: Firebase Firestore + WebSockets
- **Payment**: ZaloPay integration
- **Deployment**: Docker

---