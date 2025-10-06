# Data360 - Data Management Platform

A full-stack data governance and orchestration platform with React frontend and FastAPI backend.

## Features

### Governance Module
- **Users Management**: Create, read, update, and delete user accounts
- **Projects Management**: Organize and manage data projects
- **Environments Management**: Configure deployment environments

### Orchestration Module
- API integration with test data management tools
- Support for GET, POST, PUT, and DELETE requests
- Real-time API response viewing

### Find & Reserve Module
- Data mining capabilities
- Time-based data reservation system

## Project info

**URL**: https://lovable.dev/projects/c02c909a-afaf-4abf-bf99-3c1da08a932d

## Backend Integration

This project is integrated with a FastAPI backend that provides REST API endpoints for data management.

### Backend Repository
🔗 [aura-data-suite](https://github.com/LekshmiJ-QE/aura-data-suite)

### API Configuration
The frontend communicates with the backend through `src/config/api.ts`. Update the `BASE_URL` if your backend runs on a different port:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  TIMEOUT: 10000,
} as const;
```

### Available API Endpoints

**Users** (`/users/`)
- `GET /` - List all users
- `POST /` - Create new user
- `GET /{id}` - Get user by ID
- `PUT /{id}` - Update user
- `DELETE /{id}` - Delete user

**Projects** (`/projects/`)
- `GET /` - List all projects
- `POST /` - Create new project
- `GET /{id}` - Get project by ID
- `PUT /{id}` - Update project
- `DELETE /{id}` - Delete project

**Environments** (`/environments/`)
- `GET /` - List all environments
- `POST /` - Create new environment
- `GET /{id}` - Get environment by ID
- `PUT /{id}` - Update environment
- `DELETE /{id}` - Delete environment

## Getting Started

### Prerequisites
- **Frontend**: Node.js 18+ and npm
- **Backend**: Python 3.10+, PostgreSQL (or your preferred database)

### Backend Setup

1. Clone and navigate to the backend repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure database in `database.py`

4. Run FastAPI server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c02c909a-afaf-4abf-bf99-3c1da08a932d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Technologies Used

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn UI** component library
- **React Router** for navigation
- **React Query** for data management

### Backend
- **FastAPI** for REST API
- **SQLAlchemy** ORM
- **PostgreSQL** database
- **Pydantic** for validation

## Project Structure

```
.
├── src/                      # Frontend source
│   ├── components/          # React components
│   │   ├── ui/             # Shadcn UI components
│   │   ├── AppSidebar.tsx  # Navigation sidebar
│   │   └── DashboardLayout.tsx
│   ├── pages/              # Page components
│   │   ├── Auth.tsx        # Login page
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── Users.tsx       # Users management
│   │   ├── Projects.tsx    # Projects management
│   │   ├── Environments.tsx
│   │   ├── Orchestration.tsx
│   │   └── FindReserve.tsx
│   ├── services/           # API service layers
│   │   ├── user.service.ts
│   │   ├── project.service.ts
│   │   └── environment.service.ts
│   ├── types/              # TypeScript interfaces
│   │   ├── user.ts
│   │   ├── project.ts
│   │   └── environment.ts
│   ├── lib/                
│   │   └── api-client.ts   # HTTP client
│   └── config/             
│       └── api.ts          # API configuration
├── models/                  # Backend SQLAlchemy models
├── schemas/                 # Backend Pydantic schemas
├── routers/                 # Backend API routes
├── crud/                    # Backend CRUD operations
├── main.py                  # Backend entry point
└── database.py             # Database configuration
```

## CORS Configuration

The backend is configured to accept requests from any origin in development. For production, update `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c02c909a-afaf-4abf-bf99-3c1da08a932d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
