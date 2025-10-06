from sqlalchemy.orm import Session
from app.models.feature_names import FeatureNames
from app.schemas.feature_names import FeatureNamesCreate

def create_feature_name(db: Session, feature: FeatureNamesCreate):
    db_feature = FeatureNames(**feature.dict())
    db.add(db_feature)
    db.commit()
    db.refresh(db_feature)
    return db_feature

def get_feature_name(db: Session, feature_id: int):
    return db.query(FeatureNames).filter(FeatureNames.Feature_ID == feature_id).first()

def get_feature_names(db: Session, skip: int = 0, limit: int = 100):
    return db.query(FeatureNames).offset(skip).limit(limit).all()

def update_feature_name(db: Session, feature_id: int, feature: FeatureNamesCreate):
    db_feature = db.query(FeatureNames).filter(FeatureNames.Feature_ID == feature_id).first()
    if db_feature:
        for key, value in feature.dict().items():
            setattr(db_feature, key, value)
        db.commit()
        db.refresh(db_feature)
    return db_feature

def delete_feature_name(db: Session, feature_id: int):
    db_feature = db.query(FeatureNames).filter(FeatureNames.Feature_ID == feature_id).first()
    if db_feature:
        db.delete(db_feature)
        db.commit()
    return db_feature