import logging
from typing import Optional

from aiogram_i18n.managers import BaseManager
from infrastructure.database.models.users import User
from infrastructure.database.repo.requests import RequestsRepo

class UserManager(BaseManager):
    def __init__(self, default_locale: Optional[str] = None) -> None:
        super().__init__(default_locale=default_locale)
        self.language_codes: dict[int, str] = {}

    async def set_locale(self, locale: str, user: User, repo: RequestsRepo) -> None:
        await repo.users.update_user_language(user.user_id, locale)

    async def get_locale(self, user: User, repo: RequestsRepo) -> str:
        if user.language_id not in self.language_codes:
            languages = await repo.users.get_languages()
            self.language_codes = {
                language.language_id: language.code for language in languages
            }

        return self.language_codes.get(user.language_id, self.default_locale)
