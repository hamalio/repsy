"""Import all dialogs and add them to dialogs_list."""
from aiogram_dialog import Dialog
from tgbot.dialogs.windows import main_menu

dialogs_list = [
  Dialog(
    main_menu(),
  )
]

__all__ = [
    "dialogs_list",
]