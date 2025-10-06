# Frontend-Backend Integration Guide

This guide explains how the React frontend integrates with the FastAPI backend.

## Architecture Overview

```
┌─────────────────┐         HTTP/JSON          ┌─────────────────┐
│                 │  ────────────────────────>  │                 │
│  React Frontend │                             │ FastAPI Backend │
│  (Port 5173)    │  <────────────────────────  │  (Port 8000)    │
│                 │         Responses           │                 │
└─────────────────┘                             └─────────────────┘
```

## Integration Components

### 1. API Configuration (`src/config/api.ts`)
Central configuration for backend communication:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  TIMEOUT: 10000,
}
```

**For Production**: Update `BASE_URL` to your production backend URL.

### 2. API Client (`src/lib/api-client.ts`)
Generic HTTP client with:
- Automatic JSON headers
- Request timeout handling
- Unified error handling
- Support for GET, POST, PUT, DELETE methods

### 3. Type Definitions (`src/types/`)
TypeScript interfaces matching backend Pydantic schemas:
- `user.ts` - User and UserCreate interfaces
- `project.ts` - Project and ProjectCreate interfaces
- `environment.ts` - Environment and EnvironmentCreate interfaces

### 4. Service Layer (`src/services/`)
Type-safe API service wrappers:
- `user.service.ts` - User CRUD operations
- `project.service.ts` - Project CRUD operations
- `environment.service.ts` - Environment CRUD operations

### 5. UI Pages (`src/pages/`)
React pages consuming the services:
- `Users.tsx` - Users management with create/edit dialog
- `Projects.tsx` - Projects management with create/edit dialog
- `Environments.tsx` - Environments management with create/edit dialog

## Data Flow

```
User Action (Button Click)
    ↓
Page Component Handler
    ↓
Service Method Call
    ↓
API Client (fetch)
    ↓
FastAPI Backend
    ↓
Database (SQLAlchemy)
    ↓
Response (Pydantic Schema)
    ↓
API Client Response
    ↓
Page Component State Update
    ↓
UI Re-render
```

## Testing the Integration

### 1. Start Backend
```bash
cd backend
uvicorn main:app --reload --port 8000
```

Verify backend is running:
- Open `http://localhost:8000/docs` (Swagger UI)
- Test endpoints directly from Swagger

### 2. Start Frontend
```bash
npm run dev
```

Frontend should open at `http://localhost:5173`

### 3. Test CRUD Operations

**Users Management:**
1. Navigate to Dashboard → Users
2. Click "Add User" button
3. Fill form and submit
4. Verify user appears in table
5. Test Edit and Delete

**Projects Management:**
1. Navigate to Dashboard → Projects
2. Click "New Project" button
3. Fill form and submit
4. Verify project appears in table
5. Test Edit and Delete

**Environments Management:**
1. Navigate to Dashboard → Environments
2. Click "Add Environment" button
3. Fill form and submit
4. Verify environment appears in table
5. Test Edit and Delete

## Error Handling

The integration includes comprehensive error handling:

### Network Errors
- Connection refused
- Timeout errors
- Server unavailable

### API Errors
- 404 Not Found
- 500 Internal Server Error
- Validation errors

All errors display user-friendly toast notifications.

## CORS Configuration

The backend `main.py` includes CORS middleware:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**For Production:**
```python
allow_origins=["https://your-frontend-domain.com"]
```

## Environment-Specific Configuration

### Development
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

### Production
Update `src/config/api.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://your-api-domain.com'
    : 'http://localhost:8000',
  TIMEOUT: 10000,
}
```

## Deployment Checklist

- [ ] Update `API_CONFIG.BASE_URL` for production
- [ ] Configure CORS in backend for production domain
- [ ] Set up database connection string
- [ ] Enable HTTPS for API communication
- [ ] Test all CRUD operations in production
- [ ] Monitor API error rates
- [ ] Set up logging and monitoring

## Common Issues

### Issue: CORS Error
**Symptom:** Browser console shows CORS policy error
**Solution:** 
1. Verify backend CORS middleware includes frontend origin
2. Check backend is running on port 8000
3. Clear browser cache

### Issue: Connection Refused
**Symptom:** "Failed to fetch" or timeout errors
**Solution:**
1. Verify backend is running: `http://localhost:8000`
2. Check `API_CONFIG.BASE_URL` is correct
3. Verify firewall allows connections

### Issue: 404 Not Found
**Symptom:** Specific endpoints return 404
**Solution:**
1. Check endpoint path in service file
2. Verify router is included in `main.py`
3. Check FastAPI logs for routing errors

### Issue: Validation Error (422)
**Symptom:** POST/PUT requests fail with validation error
**Solution:**
1. Check request body matches schema
2. Verify required fields are provided
3. Check field types match schema

## Additional Resources

- FastAPI Documentation: https://fastapi.tiangolo.com/
- React Query: https://tanstack.com/query/latest
- TypeScript: https://www.typescriptlang.org/

## Support

For issues or questions:
1. Check console logs (Browser DevTools)
2. Check backend logs (Terminal running uvicorn)
3. Review Swagger docs at `http://localhost:8000/docs`
4. Check this integration guide

## Next Steps

1. **Add Authentication**: Implement JWT tokens or session-based auth
2. **Add Real-time Updates**: Consider WebSockets for live data
3. **Optimize Performance**: Implement caching and pagination
4. **Add Tests**: Unit tests for services, integration tests for API calls
5. **Monitoring**: Add error tracking (Sentry) and analytics
