from typing import Optional
from .base import Base, TimestampMixin, TableNameMixin, int_pk
from sqlalchemy import ForeignKey, String, BIGINT, Integer
from sqlalchemy.orm import Mapped, mapped_column

class User(Base, TimestampMixin, TableNameMixin):
    user_id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=False)
    username: Mapped[Optional[str]] = mapped_column(String(128))
    full_name: Mapped[str] = mapped_column(String(128))
    language_id: Mapped[int] = mapped_column(Integer, ForeignKey("languages.language_id"))


class Language(Base):
    __tablename__ = "languages"

    language_id: Mapped[int_pk]
    name: Mapped[str] = mapped_column(String(55))
    code: Mapped[str] = mapped_column(String(55), unique=True)