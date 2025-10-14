from sqlalchemy.orm import Session
from app.models.genrocket_services_details import GenRocketServicesDetails
from app.schemas.genrocket_services_details import GenRocketServicesDetailsCreate, GenRocketServicesDetailsUpdate

def get_all_services(db: Session):
    return db.query(GenRocketServicesDetails).all()

def get_service_by_id(db: Session, service_id: int):
    return db.query(GenRocketServicesDetails).filter(GenRocketServicesDetails.service_id == service_id).first()

def create_service(db: Session, service: GenRocketServicesDetailsCreate):
    db_service = GenRocketServicesDetails(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def update_service(db: Session, service_id: int, service: GenRocketServicesDetailsUpdate):
    db_service = db.query(GenRocketServicesDetails).filter(GenRocketServicesDetails.service_id == service_id).first()
    if db_service:
        for key, value in service.model_dump(exclude_unset=True).items():
            setattr(db_service, key, value)
        db.commit()
        db.refresh(db_service)
    return db_service

def delete_service(db: Session, service_id: int):
    db_service = db.query(GenRocketServicesDetails).filter(GenRocketServicesDetails.service_id == service_id).first()
    if db_service:
        db.delete(db_service)
        db.commit()
    return db_service