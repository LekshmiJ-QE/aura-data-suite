from sqlalchemy.orm import Session
from app.models.delete_logs import DeleteLogs
from app.schemas.delete_logs import DeleteLogsCreate, DeleteLogsUpdate

def get_all_logs(db: Session):
    return db.query(DeleteLogs).all()

def get_log_by_id(db: Session, log_id: int):
    return db.query(DeleteLogs).filter(DeleteLogs.log_id == log_id).first()

def create_log(db: Session, log: DeleteLogsCreate):
    db_log = DeleteLogs(**log.model_dump())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def update_log(db: Session, log_id: int, log: DeleteLogsUpdate):
    db_log = db.query(DeleteLogs).filter(DeleteLogs.log_id == log_id).first()
    if db_log:
        for key, value in log.model_dump(exclude_unset=True).items():
            setattr(db_log, key, value)
        db.commit()
        db.refresh(db_log)
    return db_log

def delete_log(db: Session, log_id: int):
    db_log = db.query(DeleteLogs).filter(DeleteLogs.log_id == log_id).first()
    if db_log:
        db.delete(db_log)
        db.commit()
    return db_log