import sys
import os

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal
from app.models.profile import Profile, ProfileTitle

def insert_test_data():
    db = SessionLocal()
    try:
        profile = db.query(Profile).first()
        if not profile:
            profile = Profile(
                full_name="Fransciesco",
                tagline="Membangun produk digital dengan <span style=\"color:var(--accent)\" class=\"italic\">detail</span> & ketelitian.",
                about_heading="Background & how I work.",
                about_text="Saya seorang pengembang full-stack yang berfokus pada arsitektur yang rapi dan pengalaman pengguna yang jelas. Suka membongkar sistem sampai ke detail terkecil — dari skema database sampai transisi antarmuka.\nSaat ini aktif memperdalam React, Docker, dan PostgreSQL lewat proyek nyata, bukan sekadar tutorial.",
                years_exp=2,
                total_projects=10,
                total_clients=5,
                photo_url="/profile.png",
                email="test@example.com"
            )
            db.add(profile)
            db.commit()
            db.refresh(profile)
        
        # Add titles if not exist
        if not profile.titles:
            titles = [
                ProfileTitle(profile_id=profile.id, text="Web Developer", order_index=1),
                ProfileTitle(profile_id=profile.id, text="Mobile Developer", order_index=2),
                ProfileTitle(profile_id=profile.id, text="UI/UX Designer", order_index=3),
            ]
            db.add_all(titles)
            db.commit()
            print("Test data inserted successfully.")
        else:
            print("Test data already exists.")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    insert_test_data()
