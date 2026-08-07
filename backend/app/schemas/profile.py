from pydantic import BaseModel
from typing import List

class LocalizedText(BaseModel):
    id: str
    en: str

class ProfileTitleBase(BaseModel):
    text: LocalizedText
    order_index: int

class ProfileTitleCreate(ProfileTitleBase):
    pass

class ProfileTitleResponse(ProfileTitleBase):
    id: int
    profile_id: int

    class Config:
        from_attributes = True

class ProfileBase(BaseModel):
    full_name: str
    tagline: LocalizedText
    about_heading: LocalizedText
    about_text: LocalizedText
    years_exp: int
    total_projects: int
    total_clients: int
    photo_url: str
    email: str
    location: str | None = None

class ProfileUpdate(ProfileBase):
    titles: List[ProfileTitleBase]

class ProfileResponse(ProfileBase):
    id: int
    titles: List[ProfileTitleResponse] = []

    class Config:
        from_attributes = True
