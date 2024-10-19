# Job Posting Board with Email Automation

This is a full-stack MERN project for a job posting board where companies can register, verify their accounts via email, post jobs, and send automated emails to candidates. It includes authentication, job posting features, and automated email notifications using Nodemailer.

## Tech Stack

- **Frontend**: React.js (Responsive UI)
- **Backend**: Node.js, Express.js (RESTful API)
- **Database**: MongoDB (Company details, job postings, and email logs)
- **Email Service**: Nodemailer (for email automation)
- **Authentication**: JWT-based authentication

## Features

- **Company Registration & Login**:
  - Email and mobile verification required for account activation.
  - Companies can log in and post jobs after verification.
- **Job Posting**:
  - Authenticated companies can post jobs with details such as job title, description, experience level, candidate email, and end date.
- **Email Automation**:
  - Companies can send job alerts to multiple candidates via email.
  - Emails include job details and sender information.
- **Logout**:
  - Logout functionality that clears tokens or sessions.
  
## Bonus Features

- **Email Templates**: Customized email templates for a personalized candidate experience.

## API Endpoints (Postman Collection)

- **User Registration**: `/api/auth/register`
- **User Login**: `/api/auth/login`
- **Job Posting**: `/api/jobs/post`
- **Email Automation**: `/api/jobs/send-email`
- **Logout**: `/api/auth/logout`

### Postman API Testing Collection

```json
{
    "info": {
        "_postman_id": "e1038c69-4124-4eec-b823-5bd031f75081",
        "name": "weather-monitoring",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        "_exporter_id": "19349818"
    },
    "item": [
        {
            "name": "Fetch Weather Data",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "http://localhost:5001/api/weather/fetch",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "5000",
                    "path": ["api", "weather", "fetch"]
                }
            },
            "response": []
        },
        {
            "name": "Get Daily Weather Summary",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "http://localhost:5001/api/weather/summary",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "5000",
                    "path": ["api", "weather", "summary"]
                }
            },
            "response": []
        },
        {
            "name": "alerts",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "http://localhost:5001/api/weather/alerts",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "5001",
                    "path": ["api", "weather", "alerts"]
                }
            },
            "response": []
        },
        {
            "name": "testTempConversion",
            "request": {
                "method": "POST",
                "header": [],
                "body": {
                    "mode": "raw",
                    "raw": "{ \"tempInKelvin\": 298.15, \"unit\": \"Celsius\" }",
                    "options": {
                        "raw": {
                            "language": "json"
                        }
                    }
                },
                "url": {
                    "raw": "http://localhost:5001/api/weather/testTempConversion",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "5001",
                    "path": ["api", "weather", "testTempConversion"]
                }
            },
            "response": []
        }
    ]
}
```

## Setup Instructions

### Clone the frontend and backend repositories.

- **Frontend**: [job-posting-board-Frontend](https://github.com/deepak9236/job-posting-board-Frontend.git)
- **Backend**: [job-posting-board](https://github.com/deepak9236/job-posting-board.git)

### Install dependencies:

- **Frontend**: `npm install`
- **Backend**: `npm install`

### Set up environment variables for the backend (e.g., MongoDB URI, email service credentials).

### Run the project:

- **Frontend**: `npm start`
- **Backend**: `npm run dev`

## Deployment Links

- **Frontend Live Demo**: [Netlify Deployment](https://cute-duckanoo-21ac6b.netlify.app/register)
- **Video Explanation**: [Loom Video](https://www.loom.com/share/b85e74b50ea64f169388f212f821119c?sid=a9eb56f5-c202-4519-9b25-9056cc74e50d)
