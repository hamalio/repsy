from aiogram_dialog.widgets.kbd import ScrollingGroup, Select
from aiogram_dialog.widgets.text import Format
import operator

def paginated_languages(on_click):
    return ScrollingGroup(
        Select(
            Format("{item[0]}"),
            id="s_scroll_languages",
            item_id_getter=operator.itemgetter(1),
            items="languages",
            on_click=on_click,
        ),
        id="languages_ids",
        width=3,
        height=1,
        hide_on_single_page=True
    )