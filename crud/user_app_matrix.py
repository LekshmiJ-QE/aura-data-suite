from sqlalchemy.orm import Session
from app.models.user_app_matrix import UserAppMatrix
from app.schemas.user_app_matrix import UserAppMatrixCreate

def create_user_app_matrix(db: Session, matrix: UserAppMatrixCreate):
    db_matrix = UserAppMatrix(**matrix.dict())
    db.add(db_matrix)
    db.commit()
    db.refresh(db_matrix)
    return db_matrix

def get_user_app_matrix(db: Session, matrix_id: int):
    return db.query(UserAppMatrix).filter(UserAppMatrix.Matrix_ID == matrix_id).first()

def get_user_app_matrices(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserAppMatrix).offset(skip).limit(limit).all()

def update_user_app_matrix(db: Session, matrix_id: int, matrix: UserAppMatrixCreate):
    db_matrix = db.query(UserAppMatrix).filter(UserAppMatrix.Matrix_ID == matrix_id).first()
    if db_matrix:
        for key, value in matrix.dict().items():
            setattr(db_matrix, key, value)
        db.commit()
        db.refresh(db_matrix)
    return db_matrix

def delete_user_app_matrix(db: Session, matrix_id: int):
    db_matrix = db.query(UserAppMatrix).filter(UserAppMatrix.Matrix_ID == matrix_id).first()
    if db_matrix:
        db.delete(db_matrix)
        db.commit()
    return db_matrix