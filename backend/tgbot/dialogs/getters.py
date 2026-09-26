from typing import Any, Dict
from aiogram_dialog import DialogManager

from config import Config
from infrastructure.database.repo.requests import RequestsRepo

async def get_main_menu_data(dialog_manager: DialogManager, **kwargs) -> Dict[str, Any]:
    config: Config = dialog_manager.middleware_data["config"]

    return {
        "web_app_url": config.tg_bot.web_app_url,
    }

async def get_languages_data(dialog_manager: DialogManager, **kwargs) -> Dict[str, Any]:
    repo: RequestsRepo = dialog_manager.middleware_data["repo"]

    languages = await repo.users.get_languages()

    return {
        "languages": [(language.name, language.code) for language in languages],
    }