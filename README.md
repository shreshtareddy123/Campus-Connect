# Campus-Connect

Campus-Connect is a full-stack web development project designed to bridge the gap between professors and students by centralizing TA, research, and student worker opportunities. This repository contains the source code for the Campus-Connect project.

## Live Deployment

Access the deployed app here:
[https://campus-connect-b87d4.web.app/](https://campus-connect-b87d4.web.app/)

## Project Structure

The repository is organized as a monorepo.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (or yarn)
- Firebase CLI (install with `npm install -g firebase-tools`)
- A Firebase project configured for Hosting (and optionally, Firestore & Auth)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd campus-connect
   ```

2. **Install Dependencies:**
- Frontend
   ```bash
   cd frontend
   npm install
   ```
- Backend
    ```
    cd ../backend
    npm install
    ```

3. **Configure Environment Variables:**
- Frontend

    Create a .env file in the frontend/ folder with:
    ```
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

- Backend

    Create a .env file in the backend/ folder for variables like:
    ```
    PORT=5000
    ```

## Development
### Running the application locally

- Frontend

    From the frontend/ folder, start the Vite development server:
    ```
    npm run dev
    ```
    Visit http://localhost:3000.

- Backend

    From the backend/ folder, start your Express server:
    ```
    npm run dev
    ```
    Runs on http://localhost:5000.

### Building the Application

- Frontend Production Build:
    ```
    cd frontend
    npm run build
    ```
    This generates production files in the frontend/dist folder.


## Deployment

### Deploy to Firebase Hosting


1. **Login to Firebase CLI:**
   ```bash
   firebase login
   ```

2. **Build the Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy:**
   ```bash
   cd ..
   firebase deploy
   ```

    The app will be deployed to Firebase Hosting. Confirm the deployment at the URL given.


## GitHub Actions CI/CD
The project is configured with GitHub Actions to automate builds and deployments:

- PR Previews: A workflow in *.github/workflows/firebase-hosting-pull-request.yml* builds the app (from the frontend/ folder) and deploys a preview for each pull request.

- Production Deployments: Another workflow in *.github/workflows/deploy-production.yml* triggers deployments on pushes to the main branch.


Ensure you’ve added the Firebase service account secret and other necessary secrets in your GitHub repository settings.

## Contact
For questions or issues, please open an issue in this repository or contact the development team.