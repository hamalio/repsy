from typing import TYPE_CHECKING, Any
from aiogram.types import CallbackQuery
from aiogram_dialog import DialogManager

from tgbot.dialogs.states import MainMenu

if TYPE_CHECKING:
    from tgbot.stub.stub import I18nContext


async def on_language_selected(c: CallbackQuery, widget: Any, manager: DialogManager, language_code: str) -> None:
    i18n: I18nContext = manager.middleware_data["i18n"]

    await i18n.set_locale(language_code)
    await c.answer(i18n.get("dialog-language_changed"), show_alert=True)

    await manager.switch_to(MainMenu.main_menu)