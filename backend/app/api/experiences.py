from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.core.utils import sync_tags
from app.models.experience import Experience, ExperienceTag
from app.schemas.experience import ExperienceCreate, ExperienceUpdate, ExperienceResponse

router = APIRouter(prefix="/admin/experiences", tags=["experiences"])

@router.post("", response_model=ExperienceResponse)
def create_experience(exp_in: ExperienceCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    experience = Experience(**exp_in.model_dump(exclude={'tags'}))
    db.add(experience)
    db.flush()
    
    for tag_str in exp_in.tags:
        tag = ExperienceTag(tag=tag_str, experience_id=experience.id)
        db.add(tag)
        
    db.commit()
    db.refresh(experience)
    return experience

@router.put("/{exp_id}", response_model=ExperienceResponse)
def update_experience(exp_id: int, exp_in: ExperienceUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    experience = db.query(Experience).filter(Experience.id == exp_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
        
    for key, value in exp_in.model_dump(exclude={'tags'}).items():
        setattr(experience, key, value)
        
    # Update tags
    sync_tags(db, ExperienceTag, "experience_id", experience.id, exp_in.tags)
        
    db.commit()
    db.refresh(experience)
    return experience

@router.delete("/{exp_id}")
def delete_experience(exp_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    experience = db.query(Experience).filter(Experience.id == exp_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
        
    db.delete(experience)
    db.commit()
    return {"detail": "Experience deleted"}
