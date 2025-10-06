from pydantic import BaseModel
from typing import Optional

class DBDefinationTableBase(BaseModel):
    DB_Name: str
    DB_P1_Name: Optional[str] = None
    DB_P2_Name: Optional[str] = None
    DB_P3_Name: Optional[str] = None
    DB_P4_Name: Optional[str] = None
    DB_P5_Name: Optional[str] = None
    DB_P6_Name: Optional[str] = None
    DB_P7_Name: Optional[str] = None

class DBDefinationTableCreate(DBDefinationTableBase):
    pass

class DBDefinationTable(DBDefinationTableBase):
    DB_ID: int

    class Config:
        orm_mode = True