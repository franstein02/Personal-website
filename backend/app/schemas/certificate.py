from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import date
from app.schemas.profile import LocalizedText

class CertificateImageInput(BaseModel):
    image_url: str
    public_id: Optional[str] = None
    page_order: int

class CertificateImageResponse(BaseModel):
    id: int
    image_url: str
    public_id: Optional[str] = None
    page_order: int

    class Config:
        from_attributes = True

class CertificateBase(BaseModel):
    title: LocalizedText
    issued_by: Optional[LocalizedText] = None
    issued_date: Optional[date] = None
    order_index: int

class CertificateCreate(CertificateBase):
    images: List[CertificateImageInput] = []

class CertificateUpdate(CertificateBase):
    images: List[CertificateImageInput] = []

class CertificateResponse(CertificateBase):
    id: int
    images: List[CertificateImageResponse] = []

    class Config:
        from_attributes = True
