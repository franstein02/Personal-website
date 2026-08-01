from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.db.database import get_db
from app.models.profile import Profile
from app.models.certificate import Certificate
from app.models.experience import Experience
from app.models.account import Account
from app.schemas.profile import ProfileResponse
from app.schemas.certificate import CertificateResponse
from app.schemas.experience import ExperienceResponse
from app.schemas.account import AccountResponse

router = APIRouter(prefix="/public", tags=["public"])

@router.get("/home")
def get_home_data(db: Session = Depends(get_db)) -> Dict[str, Any]:
    profile = db.query(Profile).first()
    certificates = db.query(Certificate).order_by(Certificate.order_index).all()
    experiences = db.query(Experience).order_by(Experience.order_index).all()
    accounts = db.query(Account).order_by(Account.order_index).all()
    
    return {
        "profile": ProfileResponse.model_validate(profile) if profile else None,
        "certificates": [CertificateResponse.model_validate(c) for c in certificates],
        "experiences": [ExperienceResponse.model_validate(e) for e in experiences],
        "accounts": [AccountResponse.model_validate(a) for a in accounts]
    }
