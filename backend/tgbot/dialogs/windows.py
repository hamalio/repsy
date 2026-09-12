from typing import Any, Dict
from aiogram_dialog import DialogManager, Window
from aiogram_dialog.widgets.text import Format
from aiogram_dialog.widgets.kbd.button import WebApp
from aiogram.fsm.state import StatesGroup, State

from config import Config

class MainMenu(StatesGroup):
    main_menu = State()


async def get_url(dialog_manager: DialogManager, **kwargs) -> Dict[str, Any]:
    config: Config = dialog_manager.middleware_data["config"]

    return {
        "web_app_url": config.tg_bot.web_app_url
    }

def main_menu():
    return Window(
        Format("Hello!"),
        WebApp(
            text=Format("🔗 Web App"),
            id="web_app",
            url=Format("{web_app_url}")
        ),
        state=MainMenu.main_menu,
        getter=get_url
    )