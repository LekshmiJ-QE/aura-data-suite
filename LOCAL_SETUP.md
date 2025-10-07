# Local Development Setup Guide

## Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.10+
- **PostgreSQL** database running locally
- **VS Code** (recommended extensions: Python, ESLint, Prettier)

## Backend Setup (FastAPI)

### 1. Navigate to Project Root
```bash
cd /path/to/your/project
```

### 2. Create Python Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Database
Update `database.py` with your local PostgreSQL credentials:
```python
SQLALCHEMY_DATABASE_URL = "postgresql://username:password@localhost/database_name"
```

For example:
```python
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:yourpassword@localhost/Data360"
```

### 5. Create Database Tables
```bash
# Test database connection first
python test_db.py

# Create tables (you may need to create migration scripts or use SQLAlchemy's create_all)
python -c "from app.database import engine, Base; from app.models import *; Base.metadata.create_all(bind=engine)"
```

### 6. Run FastAPI Backend
```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at:
- API: http://localhost:8000
- Swagger Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## Frontend Setup (React + Vite)

### 1. Open New Terminal in VS Code
Keep the backend terminal running and open a new terminal.

### 2. Install Node Dependencies
```bash
npm install
```

### 3. Update Backend URL (if needed)
The frontend is already configured to connect to `http://localhost:8000` in `src/config/api.ts`. No changes needed if your backend runs on port 8000.

### 4. Run Frontend Development Server
```bash
npm run dev
```

The frontend will be available at:
- **http://localhost:8080**

---

## Testing the Integration

### 1. Verify Backend is Running
- Open http://localhost:8000/docs
- You should see the Swagger UI with all API endpoints

### 2. Verify Frontend is Running
- Open http://localhost:8080
- You should see the Data360 login page

### 3. Test API Integration
1. Navigate to http://localhost:8080/dashboard/users
2. Try creating a new user
3. Check the Network tab in browser DevTools to see API calls
4. Verify data is stored in your PostgreSQL database

---

## Common Issues & Solutions

### Backend Issues

**Issue: `ModuleNotFoundError: No module named 'app'`**
```bash
# Solution: Make sure you're in the project root and have activated venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

**Issue: Database connection failed**
```bash
# Solution: Verify PostgreSQL is running and credentials are correct
# Check if database exists
psql -U postgres -c "\l"

# Create database if needed
psql -U postgres -c "CREATE DATABASE Data360;"
```

**Issue: Port 8000 already in use**
```bash
# Solution: Kill the process or use a different port
uvicorn main:app --reload --port 8001

# Update src/config/api.ts accordingly
```

### Frontend Issues

**Issue: Cannot connect to backend**
- Verify backend is running on http://localhost:8000
- Check CORS settings in `main.py` (already configured)
- Open browser DevTools > Network tab to see actual error

**Issue: Port 8080 already in use**
```bash
# Solution: Vite will automatically try port 8081, 8082, etc.
# Or specify a different port in vite.config.ts
```

---

## Development Workflow

### VS Code Terminal Layout
1. **Terminal 1**: Backend (FastAPI)
   ```bash
   source venv/bin/activate
   uvicorn main:app --reload --port 8000
   ```

2. **Terminal 2**: Frontend (Vite)
   ```bash
   npm run dev
   ```

### Making Changes
- **Backend changes**: FastAPI auto-reloads on file changes
- **Frontend changes**: Vite hot-reloads automatically
- Both servers watch for changes and update instantly

### Debugging
- **Backend**: Check Terminal 1 for Python errors and API logs
- **Frontend**: Check browser DevTools Console and Network tabs
- **Database**: Use pgAdmin or DBeaver to inspect database directly

---

## Database Inspection

### Using psql
```bash
# Connect to database
psql -U postgres -d Data360

# List all tables
\dt

# View table structure
\d "User"

# Query data
SELECT * FROM "User";
```

### Using GUI Tools
- **pgAdmin**: https://www.pgadmin.org/
- **DBeaver**: https://dbeaver.io/

---

## Production Build

### Build Frontend for Production
```bash
npm run build
```

The production build will be in the `dist/` folder.

### Serve Production Build
```bash
npm run preview
```

---

## Next Steps

1. ✅ Verify both backend and frontend are running
2. ✅ Test CRUD operations on Users, Projects, Environments
3. ✅ Check database for created records
4. 🔧 Implement authentication if needed
5. 🔧 Add environment-specific configurations
6. 🔧 Set up proper error handling and logging

---

## Need Help?

- Check the `INTEGRATION_GUIDE.md` for API details
- Review `README.md` for project overview
- Visit FastAPI docs: https://fastapi.tiangolo.com/
- Visit Vite docs: https://vitejs.dev/
