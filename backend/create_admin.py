import getpass
import sys
import os

# Add backend directory to sys.path so app can be imported
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal
from app.models.admin import Admin
from app.core.security import get_password_hash

def create_admin():
    db = SessionLocal()
    try:
        existing_admin = db.query(Admin).first()
        if existing_admin:
            print("Peringatan: Admin sudah ada di database.")
            confirm = input("Apakah Anda yakin ingin menimpa/menghapus admin yang ada dan membuat baru? (y/N): ")
            if confirm.lower() != 'y':
                print("Membatalkan pembuatan admin.")
                return
            db.query(Admin).delete()
            db.commit()
            print("Admin lama telah dihapus.")

        password = getpass.getpass("Masukkan password untuk Admin baru: ")
        confirm_password = getpass.getpass("Konfirmasi password: ")

        if password != confirm_password:
            print("Error: Password tidak cocok!")
            return

        hashed_password = get_password_hash(password)
        new_admin = Admin(password_hash=hashed_password)
        db.add(new_admin)
        db.commit()
        print("Berhasil: Admin baru telah dibuat!")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
