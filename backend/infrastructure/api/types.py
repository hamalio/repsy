from typing import Optional

from pydantic import BaseModel


class UserMeResponse(BaseModel):
    user_id: int
    username: Optional[str]
    full_name: str
    language: str
    language_code: str


class UserLanguageResponse(BaseModel):
    language_code: Optional[str]


class UserLanguageUpdate(BaseModel):
    language_code: str


class LanguageResponse(BaseModel):
    name: str
    code: str