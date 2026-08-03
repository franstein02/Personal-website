import sys
import os

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal
from app.models.profile import Profile, ProfileTitle

def update_test_data():
    db = SessionLocal()
    try:
        profile = db.query(Profile).first()
        if profile:
            profile.tagline = {
                "id": "Membangun produk digital dengan detail & ketelitian.", 
                "en": "Building digital products with detail and precision."
            }
            profile.about_heading = {
                "id": "Latar belakang & cara kerja saya.", 
                "en": "Background & how I work."
            }
            profile.about_text = {
                "id": profile.about_text.get('id', '') if isinstance(profile.about_text, dict) else str(profile.about_text), 
                "en": "I'm a full-stack developer focused on clean architecture and clear user experience. I enjoy digging into systems down to the smallest detail — from database schemas to interface transitions."
            }
            db.commit()
            
            titles = db.query(ProfileTitle).filter(ProfileTitle.profile_id == profile.id).all()
            for title in titles:
                # Assuming the existing ones are "Web Developer", "Mobile Developer", "UI/UX Designer"
                old_text = title.text.get('id', '') if isinstance(title.text, dict) else str(title.text)
                title.text = {
                    "id": old_text,
                    "en": old_text
                }
            db.commit()
            print("Data updated successfully.")
        else:
            print("No profile found.")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_test_data()
