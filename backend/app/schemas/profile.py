from pydantic import BaseModel
from typing import List

class ProfileTitleBase(BaseModel):
    text: str
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
    tagline: str
    about_heading: str
    about_text: str
    years_exp: int
    total_projects: int
    total_clients: int
    photo_url: str
    email: str

class ProfileUpdate(ProfileBase):
    titles: List[ProfileTitleBase]

class ProfileResponse(ProfileBase):
    id: int
    titles: List[ProfileTitleResponse] = []

    class Config:
        from_attributes = True
