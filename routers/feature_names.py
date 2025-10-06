from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.feature_names import FeatureNames, FeatureNamesCreate
from app.crud.feature_names import (
    create_feature_name, get_feature_name, get_feature_names,
    update_feature_name, delete_feature_name
)

router = APIRouter(prefix="/feature_names", tags=["Feature Names"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=FeatureNames)
def create(feature: FeatureNamesCreate, db: Session = Depends(get_db)):
    return create_feature_name(db, feature)

@router.get("/{feature_id}", response_model=FeatureNames)
def read(feature_id: int, db: Session = Depends(get_db)):
    db_feature = get_feature_name(db, feature_id)
    if not db_feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    return db_feature

@router.get("/", response_model=list[FeatureNames])
def read_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_feature_names(db, skip, limit)

@router.put("/{feature_id}", response_model=FeatureNames)
def update(feature_id: int, feature: FeatureNamesCreate, db: Session = Depends(get_db)):
    db_feature = update_feature_name(db, feature_id, feature)
    if not db_feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    return db_feature

@router.delete("/{feature_id}", response_model=FeatureNames)
def delete(feature_id: int, db: Session = Depends(get_db)):
    db_feature = delete_feature_name(db, feature_id)
    if not db_feature:
        raise HTTPException(status_code=404, detail="Feature not found")
