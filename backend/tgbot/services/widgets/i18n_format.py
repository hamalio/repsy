from aiogram_i18n import I18nContext
from aiogram_dialog.widgets.text.format import Format
from aiogram_dialog import DialogManager
from typing import Dict

class I18nFormat(Format):
    async def _render_text(
        self, data: Dict, manager: DialogManager,
    ) -> str:
        i18n: I18nContext = manager.middleware_data["i18n"]
        return i18n.get(self.text, **data)
    

