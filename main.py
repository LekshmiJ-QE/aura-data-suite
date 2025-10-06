from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    user, project, env, user_role, project_config,
    feature_names, feature_role_access_matrix, db_defination_table, user_app_matrix
)

app = FastAPI(
    title="Data360 Governance Module API",
    description="API backend for Data360 Governance module (Projects, Users, Environments, etc.)",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(user.router)
app.include_router(project.router)
app.include_router(env.router)
app.include_router(user_role.router)
app.include_router(project_config.router)
app.include_router(feature_names.router)
app.include_router(feature_role_access_matrix.router)
app.include_router(db_defination_table.router)
app.include_router(user_app_matrix.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Data360 Governance Module API!"}