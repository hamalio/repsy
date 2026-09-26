from aiogram_dialog import Window
from aiogram_dialog.widgets.kbd import SwitchTo
from aiogram_dialog.widgets.text import Format
from aiogram_dialog.widgets.kbd.button import WebApp
from tgbot.dialogs.callback import on_language_selected
from tgbot.dialogs.getters import get_main_menu_data, get_languages_data
from tgbot.dialogs.keyboards import paginated_languages
from tgbot.dialogs.states import MainMenu
from tgbot.services.widgets.i18n_format import I18nFormat

def main_menu():
    return Window(
        I18nFormat("dialog-hello"),
        SwitchTo(
            I18nFormat("dialog-change_language"),
            id="change_language",
            state=MainMenu.language_menu,
        ),
        WebApp(
            text=Format("🔗 Web App"),
            id="web_app",
            url=Format("{web_app_url}")
        ),
        state=MainMenu.main_menu,
        getter=get_main_menu_data
    )

def language_menu():
    return Window(
        I18nFormat("dialog-choose_language"),
        paginated_languages(on_click=on_language_selected),
        SwitchTo(
            I18nFormat("dialog-back"),
            id="back",
            state=MainMenu.main_menu,
        ),
        state=MainMenu.language_menu,
        getter=get_languages_data
    )