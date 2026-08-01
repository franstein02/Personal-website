from fastapi import APIRouter, UploadFile, File, Depends
from app.core.dependencies import get_current_admin
from app.core.cloudinary import upload_image

router = APIRouter(prefix="/admin/upload", tags=["upload"])

@router.post("/image")
def upload_image_endpoint(file: UploadFile = File(...), admin=Depends(get_current_admin)):
    return upload_image(file)
