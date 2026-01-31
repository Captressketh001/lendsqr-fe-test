# Lendsqr Admin Dashboard

A comprehensive admin dashboard for managing users, loans, and financial operations. Built with React, TypeScript, and modern web technologies, this application provides a robust interface for administrators to monitor user activities, manage accounts, and track financial metrics.

## 📦 Technologies

- `Vite`
- `React.js`
- `TypeScript`
- `React Router DOM`
- `Lucide React` (Icons)
- `IndexedDB` (Local Data Storage)
- `JSON Server` (Mock API)
- `SCSS` (Custom Styling)

## 🦄 Features

Here's what you can do with the Lendsqr Admin Dashboard:

### **Login Page**
Secure authentication interface with email and password validation. Clean, professional design matching Lendsqr brand guidelines.


### **Users/Dashboard Page**
Full user management system featuring:
- Paginated user list (10, 25, 50, 100+ entries per page)
- Advanced search functionality with debouncing
- Multi-filter system (Organization, Status, Email, Phone, Date)
- Real-time filtering with URL-based state management
- Bulk actions (Activate, Deactivate, Blacklist users)
- Responsive table with horizontal scrolling on mobile

### **User Details Page**
Detailed user profile with:
- Personal information (BVN, Gender, Marital Status)
- Education and employment history
- Social media profiles
- Guarantor information
- Account balance and tier status
- Action buttons (Blacklist/Activate user)

### **Offline-First Architecture**
- IndexedDB for data persistence
- LocalStorage fallback for older browsers
- Seamless offline experience

### **Responsive Design**
Fully adaptive interface that works perfectly on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 👩🏽‍🍳 The Process

### 1. **Initial Setup & Planning**
I started by analyzing the Figma design and breaking down the requirements into reusable components. I chose TypeScript for type safety and better developer experience.

### 2. **Component Architecture**
Built a component library including:
- Reusable UI components (Button, Badge, Dropdown, SearchBar, Pagination)
- Layout components (Sidebar, Header, Layout wrapper)
- Feature-specific components (StatsCard, FilterForm, Table)

### 3. **State Management & Routing**
Implemented URL-based state management using React Router's `useSearchParams` for:
- Pagination state
- Search queries
- Filter parameters

This approach ensures shareable URLs and proper browser back/forward navigation.

### 4. **Data Layer**
- Created a mock API using JSON Server with 500 user records
- Implemented IndexedDB wrapper for offline data storage
- Built API service layer with caching strategies
- Added LocalStorage fallback for browser compatibility

### 5. **Styling & Responsiveness**
Used pure CSS with mobile-first approach:
- CSS Grid for responsive layouts
- Flexbox for component alignment
- Media queries for breakpoints
- Custom animations and transitions

## 💭 How can it be improved?

- **Authentication System**: Add JWT-based authentication with protected routes
- **Real Backend Integration**: Replace JSON Server with Node.js/Express API
- **Advanced Filtering**: Add date range filters, multiple status selection
- **Export Functionality**: Allow CSV/PDF export of user data
- **Dark Mode**: Implement theme switching with persistent preference
- **Unit Tests**: Add Jest and React Testing Library tests
- **E2E Tests**: Implement Cypress for end-to-end testing
- **Accessibility**: Improve ARIA labels and keyboard navigation
- **Performance**: Implement virtual scrolling for large datasets
- **Notifications**: Add toast notifications for user actions
- **Analytics**: Integrate analytics dashboard with real-time updates
- **Internationalization**: Add multi-language support

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository to your local machine:
```bash
git clone https://github.com/Captressketh001/lendsqr-fe-test
cd lendsqr-fe-test
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Generate mock data (500 users):
```bash
npm run generate:data
# or
yarn generate:data
```

4. Start the JSON Server (Mock API):
```bash
npm run server
# or
yarn server
```

5. In a new terminal, start the React app:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Running Both Servers Simultaneously
```bash
npm run dev:all
# or
yarn dev:all
```

### Building for Production
```bash
npm run build
# or
yarn build
```

## 📁 Project Structure
```
lendsqr-fe-test/
├── src/
│   ├── api-services/          # API service layer
│   │   └── user.ts
│   │   └── config.ts
│   │   └── __tests__/
│   │   └── user.test.ts
│   ├── app-styles/          # API service layer
│   │   └── badge.scss
│   │   └── button.scss
│   │   └── card.scss
│   │   └── dropdown.scss
│   │   └── details.scss
│   │   └── filter.scss
│   │   └── header.scss
│   │   └── login.scss
│   │   └── search.scss
│   │   └── pagination.scss
│   │   └── sidenav.scss
│   │   └── table.scss
│   │   └── user.scss
│   ├── app-components/        # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown.tsx
│   │   ├── filter.tsx
│   │   ├── header.tsx
│   │   ├── pagination.tsx
│   │   ├── search.tsx
│   │   └── sidenav.tsx
│   ├── pages/                 # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Users.tsx
│   │   └── UserDetails.tsx
│   ├── app-routes/                 # Routes
│   │   ├── index.tsx
│   ├── utils/                 # Utility functions
│   │   ├── indexedDB.ts
│   │   └── localStorage.ts
│   │   └── lib.ts
│   │   └── schema.ts
│   ├── interface-and-types/   # TypeScript interfaces
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
│   └── App.scss
│   └── index.scss
├── db.json                    # Generated mock data
├── generateUsers.ts           # Script to generate mock data
├── package.json
└── tsconfig.json
└── vitest.config.ts
```

## 🎨 Design Decisions

### Why Pure CSS over Tailwind?
- **Fine-grained Control**: Needed precise control over styling for pixel-perfect implementation
- **No Build Dependencies**: Reduced build complexity and bundle size
- **Learning Exercise**: Demonstrated CSS expertise and modern CSS features

### Why IndexedDB over Redux/Context?
- **Offline-First**: Better offline support with persistent storage
- **Performance**: Faster data access for large datasets
- **Simplicity**: No need for complex state management for this use case

### Why URL Parameters over Local State?
- **Shareable State**: Users can bookmark and share filtered/searched views
- **Browser Navigation**: Back/forward buttons work as expected
- **SEO Friendly**: Prepared for server-side rendering if needed


## 🔗 Links

- **Live Site**: [https://oluwakemi-omoyeni-lendsqr-fe-test.vercel.app](https://oluwakemi-omoyeni-lendsqr-fe-test.vercel.app)
- **GitHub Repository**: [https://github.com/Captressketh001/lendsqr-fe-test](https://github.com/Captressketh001/lendsqr-fe-test)

## 👨‍💻 Author

**Oluwakemi Omoyeni**
- LinkedIn: [https://www.linkedin.com/in/oluwakemi-omoyeni/](https://www.linkedin.com/in/oluwakemi-omoyeni/)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Design inspiration from Lendsqr


