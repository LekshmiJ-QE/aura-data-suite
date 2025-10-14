from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.genrocket_services_details import GenRocketServicesDetailsCreate, GenRocketServicesDetailsUpdate, GenRocketServicesDetailsResponse
from app.crud import genrocket_services_details as crud
from app.database import get_db

router = APIRouter(
    prefix="/genrocket_services_details",
    tags=["GenRocket Services Details"]
)

@router.get("/", response_model=list[GenRocketServicesDetailsResponse])
def read_services(db: Session = Depends(get_db)):
    return crud.get_all_services(db)

@router.get("/{service_id}", response_model=GenRocketServicesDetailsResponse)
def read_service(service_id: int, db: Session = Depends(get_db)):
    db_service = crud.get_service_by_id(db, service_id)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service

@router.post("/", response_model=GenRocketServicesDetailsResponse)
def create_service(service: GenRocketServicesDetailsCreate, db: Session = Depends(get_db)):
    return crud.create_service(db, service)

@router.put("/{service_id}", response_model=GenRocketServicesDetailsResponse)
def update_service(service_id: int, service: GenRocketServicesDetailsUpdate, db: Session = Depends(get_db)):
    updated_service = crud.update_service(db, service_id, service)
    if not updated_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return updated_service

@router.delete("/{service_id}", response_model=GenRocketServicesDetailsResponse)
def delete_service(service_id: int, db: Session = Depends(get_db)):
    deleted_service = crud.delete_service(db, service_id)
    if not deleted_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return deleted_service