from pydantic import BaseModel
from typing import List, Optional

class AccountTagBase(BaseModel):
    tag: str

class AccountTagCreate(AccountTagBase):
    pass

class AccountTagResponse(AccountTagBase):
    id: int
    account_id: int

    class Config:
        from_attributes = True

class AccountBase(BaseModel):
    platform: str
    username: str
    description: str
    profile_url: str
    order_index: int

class AccountCreate(AccountBase):
    tags: List[str]

class AccountUpdate(AccountBase):
    tags: List[str]

class AccountResponse(AccountBase):
    id: int
    tags: List[AccountTagResponse] = []

    class Config:
        from_attributes = True
