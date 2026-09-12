from typing import Optional

from pydantic import BaseModel


class UserMeResponse(BaseModel):
    user_id: int
    username: Optional[str]
    full_name: str
    language: str
    language_code: str