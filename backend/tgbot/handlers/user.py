import logging
from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram_dialog import DialogManager, StartMode

from tgbot.dialogs.windows import MainMenu

user_router = Router()


@user_router.message(CommandStart())
async def user_start(message: Message, dialog_manager: DialogManager):
  await dialog_manager.start(MainMenu.main_menu, mode=StartMode.RESET_STACK)
