from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.delete_logs import DeleteLogsCreate, DeleteLogsUpdate, DeleteLogsResponse
from app.crud import delete_logs as crud
from app.database import get_db

router = APIRouter(
    prefix="/delete_logs",
    tags=["Delete Logs"]
)

@router.get("/", response_model=list[DeleteLogsResponse])
def read_logs(db: Session = Depends(get_db)):
    return crud.get_all_logs(db)

@router.get("/{log_id}", response_model=DeleteLogsResponse)
def read_log(log_id: int, db: Session = Depends(get_db)):
    db_log = crud.get_log_by_id(db, log_id)
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
    return db_log

@router.post("/", response_model=DeleteLogsResponse)
def create_log(log: DeleteLogsCreate, db: Session = Depends(get_db)):
    return crud.create_log(db, log)

@router.put("/{log_id}", response_model=DeleteLogsResponse)
def update_log(log_id: int, log: DeleteLogsUpdate, db: Session = Depends(get_db)):
    updated_log = crud.update_log(db, log_id, log)
    if not updated_log:
        raise HTTPException(status_code=404, detail="Log not found")
    return updated_log

@router.delete("/{log_id}", response_model=DeleteLogsResponse)
def delete_log(log_id: int, db: Session = Depends(get_db)):
    deleted_log = crud.delete_log(db, log_id)
    if not deleted_log:
        raise HTTPException(status_code=404, detail="Log not found")
    return deleted_log
