from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from app.schemas.profile import LocalizedText

class ExperienceTagBase(BaseModel):
    tag: str

class ExperienceTagCreate(ExperienceTagBase):
    pass

class ExperienceTagResponse(ExperienceTagBase):
    id: int
    experience_id: int

    class Config:
        from_attributes = True

class ExperienceBase(BaseModel):
    position: str
    company: str
    employment_type: str
    start_date: date
    end_date: Optional[date] = None
    description: LocalizedText
    order_index: int

class ExperienceCreate(ExperienceBase):
    tags: List[str]

class ExperienceUpdate(ExperienceBase):
    tags: List[str]

class ExperienceResponse(ExperienceBase):
    id: int
    tags: List[ExperienceTagResponse] = []

    class Config:
        from_attributes = True
