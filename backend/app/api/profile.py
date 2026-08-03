from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.models.profile import Profile, ProfileTitle
from app.schemas.profile import ProfileUpdate, ProfileResponse

router = APIRouter(prefix="/admin/profile", tags=["profile"])

@router.put("", response_model=ProfileResponse)
def update_profile(profile_in: ProfileUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    profile = db.query(Profile).first()
    if not profile:
        profile = Profile(**profile_in.model_dump(exclude={'titles'}))
        db.add(profile)
        db.flush()
    else:
        for key, value in profile_in.model_dump(exclude={'titles'}).items():
            setattr(profile, key, value)
    
    # Update titles
    db.query(ProfileTitle).filter(ProfileTitle.profile_id == profile.id).delete()
    for title_in in profile_in.titles:
        title = ProfileTitle(**title_in.model_dump(), profile_id=profile.id)
        db.add(title)
        
    db.commit()
    db.refresh(profile)
    return profile
