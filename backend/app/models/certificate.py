from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

from sqlalchemy.dialects.postgresql import JSONB

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(JSONB)
    issued_by = Column(JSONB, nullable=True)
    issued_date = Column(Date, nullable=True)
    order_index = Column(Integer)

    images = relationship("CertificateImage", back_populates="certificate", cascade="all, delete-orphan", order_by="CertificateImage.page_order")

class CertificateImage(Base):
    __tablename__ = "certificate_images"

    id = Column(Integer, primary_key=True, autoincrement=True)
    certificate_id = Column(Integer, ForeignKey("certificates.id", ondelete="CASCADE"))
    image_url = Column(String)
    public_id = Column(String, nullable=True)
    page_order = Column(Integer)

    certificate = relationship("Certificate", back_populates="images")
