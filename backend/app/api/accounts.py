from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.dependencies import get_current_admin
from app.core.utils import sync_tags
from app.models.account import Account, AccountTag
from app.schemas.account import AccountCreate, AccountUpdate, AccountResponse

router = APIRouter(prefix="/admin/accounts", tags=["accounts"])

@router.post("", response_model=AccountResponse)
def create_account(account_in: AccountCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    account = Account(**account_in.model_dump(exclude={'tags'}))
    db.add(account)
    db.flush()
    
    for tag_str in account_in.tags:
        tag = AccountTag(tag=tag_str, account_id=account.id)
        db.add(tag)
        
    db.commit()
    db.refresh(account)
    return account

@router.put("/{account_id}", response_model=AccountResponse)
def update_account(account_id: int, account_in: AccountUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
        
    for key, value in account_in.model_dump(exclude={'tags'}).items():
        setattr(account, key, value)
        
    # Update tags
    sync_tags(db, AccountTag, "account_id", account.id, account_in.tags)
        
    db.commit()
    db.refresh(account)
    return account

@router.delete("/{account_id}")
def delete_account(account_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
        
    db.delete(account)
    db.commit()
    return {"detail": "Account deleted"}
