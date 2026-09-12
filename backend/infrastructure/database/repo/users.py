from typing import Optional
from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert

from infrastructure.database.models import User, Language
from infrastructure.database.repo.base import BaseRepo


class UsersRepo(BaseRepo):
    async def create_user(
        self,
        user_id: int,
        full_name: str,
        language_id: int,
        username: Optional[str] = None,
    ):
        insert_stmt = (
            insert(User)
            .values(
                user_id=user_id,
                username=username,
                full_name=full_name,
                language_id=language_id,
            ).returning(User)
        )
        result = await self.session.execute(insert_stmt)

        await self.session.commit()
        return result.scalar_one()
    
    async def get_language_id(
        self,
        code: str
    ):
        stmt = select(Language.language_id).where(Language.code == code)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_language(
        self,
        language_id: int
    ):
        stmt = select(Language).where(Language.language_id == language_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_user_by_id(
        self,
        user_id: int
    ):
        stmt = select(User).where(User.user_id == user_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()