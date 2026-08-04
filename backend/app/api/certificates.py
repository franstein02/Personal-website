from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload
from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.core.cloudinary import delete_image
from app.models.certificate import Certificate, CertificateImage
from app.schemas.certificate import CertificateCreate, CertificateUpdate, CertificateResponse

router = APIRouter(prefix="/admin/certificates", tags=["certificates"])

@router.post("", response_model=CertificateResponse)
def create_certificate(cert_in: CertificateCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    cert_data = cert_in.model_dump(exclude={"images"})
    certificate = Certificate(**cert_data)
    db.add(certificate)
    
    for img_data in cert_in.images:
        image = CertificateImage(**img_data.model_dump())
        certificate.images.append(image)
        
    db.commit()
    db.refresh(certificate)
    return certificate

@router.put("/{cert_id}", response_model=CertificateResponse)
def update_certificate(cert_id: int, cert_in: CertificateUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    certificate = db.query(Certificate).options(selectinload(Certificate.images)).filter(Certificate.id == cert_id).first()
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
        
    # Check if image was replaced
    for old_img in certificate.images:
        if old_img.public_id:
            delete_image(old_img.public_id)
            
    certificate.images.clear()
        
    cert_data = cert_in.model_dump(exclude={"images"})
    for key, value in cert_data.items():
        setattr(certificate, key, value)
        
    for img_data in cert_in.images:
        image = CertificateImage(**img_data.model_dump())
        certificate.images.append(image)
        
    db.commit()
    db.refresh(certificate)
    return certificate

@router.delete("/{cert_id}")
def delete_certificate(cert_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    certificate = db.query(Certificate).options(selectinload(Certificate.images)).filter(Certificate.id == cert_id).first()
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
        
    for old_img in certificate.images:
        if old_img.public_id:
            delete_image(old_img.public_id)
        
    db.delete(certificate)
    db.commit()
    return {"detail": "Certificate deleted"}
