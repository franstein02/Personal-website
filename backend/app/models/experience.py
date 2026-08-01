from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, autoincrement=True)
    position = Column(String)
    company = Column(String)
    employment_type = Column(String)
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)
    description = Column(Text)
    order_index = Column(Integer)

    tags = relationship("ExperienceTag", back_populates="experience", cascade="all, delete-orphan")

class ExperienceTag(Base):
    __tablename__ = "experience_tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    experience_id = Column(Integer, ForeignKey("experiences.id", ondelete="CASCADE"))
    tag = Column(String)

    experience = relationship("Experience", back_populates="tags")
