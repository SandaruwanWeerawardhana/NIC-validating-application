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

The application features a modern, glassmorphism-styled UI with secure JWT-based authentication, allowing users to manage their NIC validation history, view dashboard statistics, and generate downloadable reports.

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
- Real-time validation feedback with toast notifications
- History tracking of all validated NICs

### Dashboard & Records
- View all validated NIC records
- Real-time statistics and recent validations
- Add new NIC records to the system
- Modern responsive UI with glassmorphism design and animations

### Report Generation
- **PDF Reports** - Download NIC records as formatted PDF documents
- **Excel Reports** - Export data to Excel spreadsheets for analysis

### Containerization
- Fully containerized using Docker
- Easy orchestration with Docker Compose (MySQL, Backend, Frontend)
- Production-ready build configuration

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| TypeScript | 5.9 | Type-safe JavaScript |
| Vite | 7.x | Build tool & dev server |
| TailwindCSS | 3.4 | Utility-first CSS framework |
| Zustand | 5.0 | State management |
| React Router | 7.x | Client-side routing |
| Axios | 1.13 | HTTP client |
| React Hot Toast | 2.5 | Notification system |
| Lucide React | 0.562 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Programming language |
| Spring Boot | 4.0.1 | Backend framework |
| Spring Security | 6.x | Authentication & authorization |
| Spring Data JPA | 3.x | Database ORM |
| MySQL | 8.x | Relational database |
| JWT (jjwt) | 0.12.3 | Token-based authentication |
| Lombok | 1.18 | Boilerplate reduction |
| ModelMapper | 3.2 | Object mapping |
| OpenPDF | 3.0 | PDF generation |
| Apache POI | 5.2 | Excel file generation |

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
│  │ - Report    │  │ - Report    │  │ - JWT       │  │   Parser   │  │
│  │             │  │             │  │             │  │            │  │
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
│       ├── Dockerfile                       # Backend container definition
│       ├── pom.xml                          # Maven dependencies
│       └── src/
│           ├── main/
│           │   ├── java/com/nic/nic/validation/
│           │   │   ├── config/              # Security, JWT, CORS
│           │   │   ├── controller/          # REST API endpoints
│           │   │   ├── dto/                 # Data Transfer Objects
│           │   │   ├── entity/              # Database entities
│           │   │   ├── repository/          # JPA Repositories
│           │   │   ├── service/             # Business Logic
│           │   │   ├── util/                # PDF/Excel Generators
│           │   │   └── Main.java
│           │   └── resources/
│           │       └── application.yaml     # App config
│           └── test/
│
├── Frontend/
│   ├── Dockerfile                           # Frontend container definition
│   ├── package.json                         # NPM dependencies
│   ├── vite.config.ts                       # Vite config & Proxy
│   ├── tailwind.config.js                   # Tailwind Setup
│   └── src/
│       ├── App.tsx                          # Root component
│       ├── main.tsx                         # Entry point
│       ├── components/                      # Shared Components
│       │   ├── ui/                          # Base UI elements
│       │   ├── Layout.tsx                   # Main Layout
│       │   └── ...
│       ├── pages/                           # Application Pages
│       │   ├── Login.tsx
│       │   ├── Dashboard.tsx
│       │   ├── NICValidator.tsx             # Validation logic
│       │   └── ...
│       ├── store/                           # Zustand Stores
│       └── utils/                           # Validators
│
├── docker-compose.yml                       # Docker orchestration
└── README.md
```

---

## ⚙️ Setup Instructions

### 🐳 Docker Setup (Recommended)

The easiest way to run the application is using Docker Compose.

1.  **Prerequisites:** Ensure Docker and Docker Compose are installed.
2.  **Build the Backend JAR:**
    Before running docker-compose for the first time, you must build the backend JAR file locally.
    ```bash
    cd Backend/nic-validation
    # Windows
    mvnw.cmd package -Dmaven.test.skip=true
    # Linux/Mac
    ./mvnw package -Dmaven.test.skip=true
    ```
3.  **Run with Docker Compose:**
    Go back to the project root and start the services.
    ```bash
    cd ../..
    docker-compose up --build
    ```
4.  **Access the Application:**
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:8080/api/nic](http://localhost:8080/api/nic)
    - MySQL Database: Port 3307 (User: `user`, Pass: `1234`)

### 🔧 Manual Setup

#### Prerequisites
- Node.js v18+
- Java 22 (JDK)
- MySQL Server 8.0+

#### Database Setup
1. Create a database named `nicdb`.
2. Update `Backend/nic-validation/src/main/resources/application.yaml` with your credentials.

#### Backend
1. Navigate to `Backend/nic-validation`
2. Run: `mvnw.cmd spring-boot:run` (Windows) or `./mvnw spring-boot:run` (Linux/Mac)
3. Starts on port 8080.

#### Frontend
1. Navigate to `Frontend`
2. Run: `npm install`
3. Run: `npm run dev`
4. Starts on port 5173.

---

## 🔌 API Endpoints

### Base URL: `/api/nic`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **Auth** | | | |
| `POST` | `/auth/register` | ❌ | Register new user |
| `POST` | `/auth/login` | ❌ | Login and get JWT |
| `POST` | `/auth/logout` | ✅ | Logout session |
| **NIC Operations** | | | |
| `POST` | `/add` | ✅ | Save a validated NIC record |
| `POST` | `/validate` | ✅ | Validate NIC (Query param: `?nic=...`) |
| `GET` | `/get` | ✅ | Fetch all NIC records |
| **Reports** | | | |
| `GET` | `/report/pdf` | ✅ | Download PDF Report |
| `GET` | `/report/excel` | ✅ | Download Excel Report |

---

## 📝 Environment Variables

The application uses the following environment variables (defined in `docker-compose.yml` or `application.yaml`):

| Variable | Description | Default (Docker) |
|----------|-------------|-------------------|
| `DB_URL` | JDBC Connection URL | `jdbc:mysql://mysql:3306/nicdb...` |
| `DB_USERNAME` | Database User | `user` |
| `DB_PASSWORD` | Database Password | `1234` |
| `MYSQL_ROOT_PASSWORD` | Root Password | `1234` |
| `JWT_SECRET` | Secret for Tokens | (Secure Random String) |

---
## Screenshots
<div align ="center">
  
<img width="1911" height="896" alt="register" src="https://github.com/user-attachments/assets/a461e521-706d-4357-a029-c7935d3726a7" />
<img width="1911" height="887" alt="login" src="https://github.com/user-attachments/assets/628ae300-1032-4755-adfe-bea27f09d253" />
<img width="1893" height="901" alt="n1" src="https://github.com/user-attachments/assets/a15c342e-bf12-4fa1-a726-aa2ec2062550" />
<img width="1913" height="908" alt="n2" src="https://github.com/user-attachments/assets/21962840-05a7-494e-a2e4-bbb1aa373ffa" />
<img width="1913" height="897" alt="n3" src="https://github.com/user-attachments/assets/a780daf8-b18b-45cc-88c2-94d4ae55d2ef" />

</div>
---

## 📄 License

This project is open source and available for educational purposes.
