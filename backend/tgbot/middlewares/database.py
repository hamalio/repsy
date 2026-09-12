from typing import Callable, Dict, Any, Awaitable

from aiogram import BaseMiddleware
from aiogram.types import Update

from infrastructure.database.repo.requests import RequestsRepo


class DatabaseMiddleware(BaseMiddleware):
    def __init__(self, session_pool) -> None:
        self.session_pool = session_pool

    async def __call__(
        self,
        handler: Callable[[Update, Dict[str, Any]], Awaitable[Any]],
        event: Update,
        data: Dict[str, Any],
    ) -> Any:
        async with self.session_pool() as session:
            repo = RequestsRepo(session)
            event_from_user = data.get("event_from_user")
            if not event_from_user:
                return await handler(event, data)

            user = await repo.users.get_user_by_id(user_id=event_from_user.id)

            if not user:
              language_id = await repo.users.get_language_id(
                  code=event.from_user.language_code
              )

              if language_id is None:
                  language_id = await repo.users.get_language_id(code="en")

              user = await repo.users.create_user(
                  user_id=event_from_user.id,
                  full_name=event_from_user.full_name,
                  language_id=language_id,
                  username=event_from_user.username,
              )

            data["repo"] = repo
            data["user"] = user

            result = await handler(event, data)
        return result