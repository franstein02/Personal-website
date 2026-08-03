from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.core.cloudinary import delete_image
from app.models.certificate import Certificate
from app.schemas.certificate import CertificateCreate, CertificateUpdate, CertificateResponse

router = APIRouter(prefix="/admin/certificates", tags=["certificates"])

@router.post("", response_model=CertificateResponse)
def create_certificate(cert_in: CertificateCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    certificate = Certificate(**cert_in.model_dump())
    db.add(certificate)
    db.commit()
    db.refresh(certificate)
    return certificate

@router.put("/{cert_id}", response_model=CertificateResponse)
def update_certificate(cert_id: int, cert_in: CertificateUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    certificate = db.query(Certificate).filter(Certificate.id == cert_id).first()
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
        
    # Check if image was replaced
    if certificate.public_id and certificate.public_id != cert_in.public_id:
        delete_image(certificate.public_id)
        
    for key, value in cert_in.model_dump().items():
        setattr(certificate, key, value)
        
    db.commit()
    db.refresh(certificate)
    return certificate

@router.delete("/{cert_id}")
def delete_certificate(cert_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    certificate = db.query(Certificate).filter(Certificate.id == cert_id).first()
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
        
    if certificate.public_id:
        delete_image(certificate.public_id)
        
    db.delete(certificate)
    db.commit()
    return {"detail": "Certificate deleted"}
