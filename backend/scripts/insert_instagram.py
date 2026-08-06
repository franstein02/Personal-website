import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal
from app.models.account import Account, AccountTag

def insert_instagram():
    db = SessionLocal()
    
    new_account = Account(
        platform="instagram",
        username="fransciescoo",
        profile_url="https://www.instagram.com/fransciescoo/",
        description={
            "id": "Kebugaran, lari, dan momen sehari-hari. Feed pribadi yang menangkap sesi gym, perjalanan lari, dan kehidupan melalui sudut pandang saya sendiri.",
            "en": "Fitness, running, and everyday moments. A personal feed capturing my gym sessions, running journey, and life through my own lens."
        },
        order_index=0
    )
    
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    
    tags = ["FITNESS", "RUNNING", "LIFESTYLE"]
    for tag in tags:
        db.add(AccountTag(account_id=new_account.id, tag=tag))
        
    db.commit()
    print("Successfully inserted Instagram account.")

if __name__ == "__main__":
    insert_instagram()
