# Groupomania

## Introduction

Welcome to Groupomania, my final project with OpenClassrooms! This project marks a significant milestone in my journey as I've successfully created a company social network.

In this project, I used **Express.js** for the backend while the frontend was designed with **React**.
For database management, I chose **SQL** with **MariaDB** and **PHPMyAdmin** both deployed in a **Docker-Compose** environment.

As I reflect on this achievement, I see opportunities to enhance it even further by implementing the useContext and useReducer features, which will streamline data management and reduce the volume of data transmitted between components.

---

## Getting Started

To get started with this project, follow the steps below:

### 1. Docker Setup

Make sure you have Docker installed on your system. If you don't have Docker, you can download it [here](https://www.docker.com/get-started).

### 2. Docker Compose

1. Navigate to the **"db"** directory
2. Run the following command to start the Docker containers:

```bash
docker-compose up
```

### 3. Importing the Database into PHPMyAdmin

When docker compose finishes deploying:

1.  Go to localhost:8080
2.  Enter the following credentials:
    -   User: **"root"**
    -   Password: **"root"**
3.  Click on **"Import"** in the top bar.
4.  In the **"File to import"** section, click on **"Choose a file"** and select the **"groupomania.sql"** file located in the **"db"** folder.
5.  Click on Import at the bottom

### 4. Backend Setup

1. Navigate to the **"backend"** directory.
2. Install the required Node.js dependencies using the following command:

```
npm i
```

3. Start the Node.js server using nodemon:

```
npm start
```

### 5. Frontend Setup

1. Navigate to the **"frontend"** directory.
2. Install the required React dependencies using the following commands:

```
npm i react-scripts
```

3. Start the React development server:

```
npm start
```

**You can now go to localhost:5000**
