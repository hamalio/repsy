from typing import Annotated

from fastapi import Depends, Header

from infrastructure.api.utils import session_pool, validate_telegram_auth_data
from infrastructure.database.repo.requests import RequestsRepo


async def get_repo() -> RequestsRepo:
    async with session_pool() as session:
        yield RequestsRepo(session)


async def get_current_user_id(
    authorization: str | None = Header(default=None),
) -> int:
    return validate_telegram_auth_data(authorization)


RepoDep = Annotated[RequestsRepo, Depends(get_repo)]
CurrentUserIdDep = Annotated[int, Depends(get_current_user_id)]
