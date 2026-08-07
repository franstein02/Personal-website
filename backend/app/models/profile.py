from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from app.db.database import Base

class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String)
    tagline = Column(JSONB)
    about_heading = Column(JSONB)
    about_text = Column(JSONB)
    years_exp = Column(Integer)
    total_projects = Column(Integer)
    total_clients = Column(Integer)
    photo_url = Column(String)
    email = Column(String)
    location = Column(String)

    titles = relationship("ProfileTitle", back_populates="profile", cascade="all, delete-orphan", order_by="ProfileTitle.order_index")

class ProfileTitle(Base):
    __tablename__ = "profile_titles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    profile_id = Column(Integer, ForeignKey("profile.id", ondelete="CASCADE"))
    text = Column(JSONB)
    order_index = Column(Integer)

    profile = relationship("Profile", back_populates="titles")
