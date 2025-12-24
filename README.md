<h1 align=center>Validating Application</h1>

A full-stack web application for validating and managing National Identity Card (NIC) records. This application allows users to register, authenticate, validate Sri Lankan NICs, manage validation records, and generate comprehensive reports in PDF and Excel formats.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [System Features](#system-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Folder Structure](#project-folder-structure)
- [Setup Instructions](#setup-instructions)
- [How to Run the Application](#how-to-run-the-application)
- [API Endpoints](#api-endpoints)

---

## 🎯 Project Overview

The NIC Validating Application is designed to validate Sri Lankan National Identity Cards (both old 9-digit + letter format and new 13-digit format). The system extracts vital information from NICs including:

- **Date of Birth** - Calculated from the NIC number
- **Age** - Computed based on the birth date
- **Gender** - Determined from the NIC encoding
- **Validation Status** - Confirms if the NIC format is valid

The application features a modern, glassmorphism-styled UI with secure JWT-based authentication, allowing users to manage their NIC validation history and generate downloadable reports.

---

## ✨ System Features

### Authentication & Security
- User registration with secure password hashing
- JWT-based authentication for stateless sessions
- Protected routes for authenticated users only
- Secure logout functionality

### NIC Validation
- Support for both old (9 digits + V/X) and new (13 digits) NIC formats
- Automatic extraction of birth date, age, and gender
- Real-time validation feedback
- History tracking of all validated NICs

### Dashboard & Records
- View all validated NIC records
- Real-time statistics and recent validations
- Add new NIC records to the system
- Modern responsive UI with glassmorphism design

### Report Generation
- **PDF Reports** - Download NIC records as formatted PDF documents
- **Excel Reports** - Export data to Excel spreadsheets for analysis

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| TypeScript | 5.9.3 | Type-safe JavaScript |
| Vite | 7.2.4 | Build tool & dev server |
| TailwindCSS | 3.4.17 | Utility-first CSS framework |
| Zustand | 5.0.9 | State management |
| React Router DOM | 7.11.0 | Client-side routing |
| Axios | 1.13.2 | HTTP client |
| Lucide React | 0.562.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 22 | Programming language |
| Spring Boot | 4.0.1 | Backend framework |
| Spring Security | - | Authentication & authorization |
| Spring Data JPA | - | Database ORM |
| MySQL | - | Relational database |
| JWT (jjwt) | 0.12.3 | Token-based authentication |
| Lombok | 1.18.36 | Boilerplate reduction |
| ModelMapper | 3.2.2 | Object mapping |
| OpenPDF | 3.0.0 | PDF generation |
| Apache POI | 5.2.5 | Excel file generation |

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + TypeScript)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │   Pages     │  │ Components  │  │   Store     │  │   Utils    │  │
│  │ - Login     │  │ - Layout    │  │ - AuthStore │  │ - API      │  │
│  │ - Register  │  │ - Button    │  │ - NicStore  │  │   Client   │  │
│  │ - Dashboard │  │ - Card      │  │             │  │            │  │
│  │ - Validator │  │ - Input     │  │             │  │            │  │
│  │ - AddRecord │  │ - Protected │  │             │  │            │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                          HTTP (REST API + JWT)
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  BACKEND (Spring Boot + Java)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ Controllers │  │  Services   │  │    Config   │  │   Utils    │  │
│  │ - Auth      │  │ - Auth      │  │ - Security  │  │ - JWT      │  │
│  │ - NicRecord │  │ - NicRecord │  │ - CORS      │  │ - NIC      │  │
│  │ - Report    │  │ - PDF       │  │ - JWT       │  │   Parser   │  │
│  │             │  │ - Excel     │  │             │  │            │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │   Entity    │  │    DTOs     │  │ Repository  │                  │
│  │ - User      │  │ - NicRecord │  │ - UserRepo  │                  │
│  │ - NicRecord │  │ - AuthResp  │  │ - NicRepo   │                  │
│  └─────────────┘  └─────────────┘  └─────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DATABASE (MySQL)                             │
│                    - users table                                    │
│                    - nic_records table                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Folder Structure

```
NIC Validating Application/
│
├── Backend/
│   └── nic-validation/
│       ├── pom.xml                          # Maven dependencies
│       ├── mvnw / mvnw.cmd                  # Maven wrapper scripts
│       └── src/
│           ├── main/
│           │   ├── java/com/nic/nic/validation/
│           │   │   ├── Main.java            # Application entry point
│           │   │   ├── config/              # Security, JWT, CORS config
│           │   │   ├── controller/          # REST API controllers
│           │   │   │   ├── AuthController.java
│           │   │   │   ├── NicRecordController.java
│           │   │   │   └── ReportController.java
│           │   │   ├── dto/                 # Data Transfer Objects
│           │   │   ├── entity/              # JPA entities
│           │   │   ├── repository/          # Data access layer
│           │   │   ├── service/             # Business logic layer
│           │   │   └── util/                # Utility classes
│           │   └── resources/
│           │       └── application.yaml     # App configuration
│           └── test/                        # Test files
│
├── Frontend/
│   ├── package.json                         # NPM dependencies
│   ├── vite.config.ts                       # Vite configuration
│   ├── tailwind.config.js                   # Tailwind CSS config
│   ├── tsconfig.json                        # TypeScript config
│   ├── public/                              # Static assets
│   └── src/
│       ├── App.tsx                          # Root component & routing
│       ├── main.tsx                         # Application entry point
│       ├── index.css                        # Global styles
│       ├── components/                      # Reusable UI components
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   ├── Input.tsx
│       │   ├── Layout.tsx
│       │   ├── ProtectedRoute.tsx
│       │   └── RecentValidations.tsx
│       ├── pages/                           # Application pages
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   ├── Dashboard.tsx
│       │   ├── NICValidator.tsx
│       │   └── AddRecord.tsx
│       ├── store/                           # Zustand state management
│       ├── types/                           # TypeScript type definitions
│       └── utils/                           # Helper functions
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18 or above
- **npm** or **yarn** package manager
- **Java** 22 or above (JDK)
- **Maven** (included via Maven Wrapper)
- **MySQL** Server 8.0+

### Database Setup

1. Install and start MySQL Server
2. Create a database (optional - will be auto-created):
   ```sql
   CREATE DATABASE nicdb;
   ```
3. Default credentials in `application.yaml`:
   - URL: `jdbc:mysql://localhost:3306/nicdb`
   - Username: `root`
   - Password: `1234`

> **Note:** You can override these using environment variables: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```sh
   cd Backend/nic-validation
   ```

2. Build the project:
   ```sh
   # On Linux/Mac
   ./mvnw clean install

   # On Windows
   mvnw.cmd clean install
   ```

3. Run the backend server:
   ```sh
   # On Linux/Mac
   ./mvnw spring-boot:run

   # On Windows
   mvnw.cmd spring-boot:run
   ```

4. The backend will start on [http://localhost:8080](http://localhost:8080)

### Frontend Setup

1. Open a terminal and navigate to the frontend directory:
   ```sh
   cd Frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. The frontend will start on [http://localhost:5173](http://localhost:5173)

---

## 🚀 How to Run the Application

### Development Mode

1. **Start MySQL Server** - Ensure MySQL is running on port 3306

2. **Start the Backend Server**:
   ```sh
   cd Backend/nic-validation
   mvnw.cmd spring-boot:run    # Windows
   ./mvnw spring-boot:run      # Linux/Mac
   ```

3. **Start the Frontend Development Server**:
   ```sh
   cd Frontend
   npm run dev
   ```

4. **Access the Application**: Open [http://localhost:5173](http://localhost:5173) in your browser

### Production Build

#### Frontend Production Build
```sh
cd Frontend
npm run build
npm run preview    # Preview production build
```

#### Backend Production Build
```sh
cd Backend/nic-validation
./mvnw clean package -DskipTests
java -jar target/nic-nicRecord-0.0.1-SNAPSHOT.jar
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api/nic
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Authenticate user & get JWT | ❌ |
| `POST` | `/auth/logout` | End user session | ✅ |

#### Register User
```http
POST /api/nic/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /api/nic/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "message": "Login successful"
}
```

---

### NIC Record Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/add` | Add a new NIC record | ✅ |
| `POST` | `/validate?nic={nicNumber}` | Validate a NIC number | ✅ |
| `GET` | `/get` | Get all NIC records | ✅ |

#### Add NIC Record
```http
POST /api/nic/add
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "nic": "200012345678"
}
```

#### Validate NIC
```http
POST /api/nic/validate?nic=200012345678
Authorization: Bearer <jwt_token>

Response:
{
  "nic": "200012345678",
  "birthday": "2000-01-12",
  "age": 24,
  "gender": "Male"
}
```

#### Get All Records
```http
GET /api/nic/get
Authorization: Bearer <jwt_token>

Response:
[
  {
    "nic": "200012345678",
    "birthday": "2000-01-12",
    "age": 24,
    "gender": "Male"
  },
  ...
]
```

---

### Report Generation Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/report/pdf` | Download PDF report | ✅ |
| `GET` | `/report/excel` | Download Excel report | ✅ |

#### Download PDF Report
```http
GET /api/nic/report/pdf
Authorization: Bearer <jwt_token>

Response: Binary PDF file (nic-report.pdf)
```

#### Download Excel Report
```http
GET /api/nic/report/excel
Authorization: Bearer <jwt_token>

Response: Binary Excel file (nic-report.xlsx)
```

---

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | 8080 | Backend server port |
| `DB_URL` | jdbc:mysql://localhost:3306/nicdb | MySQL connection URL |
| `DB_USERNAME` | root | Database username |
| `DB_PASSWORD` | 1234 | Database password |
| `JWT_SECRET` | (default key) | Secret key for JWT signing |

---

## 📄 License

This project is open source and available for educational purposes.

---

For more details, see the code and comments in each folder.
