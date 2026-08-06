import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal
from app.models.account import Account

def update_categories():
    db = SessionLocal()
    accounts = db.query(Account).all()
    
    for acc in accounts:
        p = acc.platform.lower() if acc.platform else ""
        if "instagram" in p or "tiktok" in p or "twitter" in p or "facebook" in p or "x" in p or "youtube" in p:
            acc.category = "SOCIAL MEDIA"
        elif "linkedin" in p:
            acc.category = "PROFESSIONAL"
        elif "github" in p or "gitlab" in p or "bitbucket" in p:
            acc.category = "DEVELOPER"
        else:
            acc.category = "FREELANCE" # Default or other
            
    db.commit()
    print("Updated categories successfully.")

if __name__ == "__main__":
    update_categories()
