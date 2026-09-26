from aiogram.fsm.state import StatesGroup, State


class MainMenu(StatesGroup):
    language_menu = State()
    main_menu = State()