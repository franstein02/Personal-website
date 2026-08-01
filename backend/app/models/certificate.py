from sqlalchemy import Column, Integer, String, Date
from app.db.database import Base

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String)
    image_url = Column(String)
    public_id = Column(String, nullable=True)
    issued_by = Column(String, nullable=True)
    issued_date = Column(Date, nullable=True)
    order_index = Column(Integer)
