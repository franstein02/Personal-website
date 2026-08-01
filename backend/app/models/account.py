from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    platform = Column(String)
    username = Column(String)
    description = Column(Text)
    profile_url = Column(String)
    order_index = Column(Integer)

    tags = relationship("AccountTag", back_populates="account", cascade="all, delete-orphan")

class AccountTag(Base):
    __tablename__ = "account_tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey("accounts.id", ondelete="CASCADE"))
    tag = Column(String)

    account = relationship("Account", back_populates="tags")
