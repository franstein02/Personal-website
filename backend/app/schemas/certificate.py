from pydantic import BaseModel
from typing import Optional
from datetime import date

class CertificateBase(BaseModel):
    title: str
    image_url: str
    public_id: Optional[str] = None
    issued_by: Optional[str] = None
    issued_date: Optional[date] = None
    order_index: int

class CertificateCreate(CertificateBase):
    pass

class CertificateUpdate(CertificateBase):
    pass

class CertificateResponse(CertificateBase):
    id: int

    class Config:
        from_attributes = True
