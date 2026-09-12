import logging
from datetime import datetime, timedelta, timezone

from aiogram.utils.web_app import WebAppInitData, safe_parse_webapp_init_data
from environs import Env
from fastapi import HTTPException

from config import Config, DbConfig, load_config
from infrastructure.database.setup import create_engine, create_session_pool

config: Config = load_config()

env = Env()
env.read_env()
db_config = DbConfig.from_env(env)

engine = create_engine(db_config)
session_pool = create_session_pool(engine)

INIT_DATA_TTL = timedelta(hours=1)


def parse_auth_header(authorization: str) -> WebAppInitData:
    if not authorization or not authorization.startswith("Bearer "):
        logging.error("Missing or malformed Authorization header")
        raise HTTPException(
            status_code=401,
            detail="auth data is not valid",
        )

    try:
        init_data = safe_parse_webapp_init_data(
            token=config.tg_bot.token,
            init_data=authorization.removeprefix("Bearer "),
        )
    except ValueError:
        logging.error("initData signature validation failed")
        raise HTTPException(
            status_code=401,
            detail="auth data is not valid",
        )

    if datetime.now(timezone.utc) - init_data.auth_date > INIT_DATA_TTL:
        logging.error("initData is expired")
        raise HTTPException(
            status_code=401,
            detail="auth data is expired",
        )

    return init_data


def validate_telegram_auth_data(authorization: str, user_id: int = None) -> int:
    init_data = parse_auth_header(authorization)

    if init_data.user is None:
        logging.error("initData contains no user")
        raise HTTPException(
            status_code=401,
            detail="auth data is not valid",
        )

    if user_id and init_data.user.id != user_id:
        logging.error("User ID in URL and in auth data do not match")
        raise HTTPException(
            status_code=403,
            detail="user_id in url and in auth data do not match",
        )

    return init_data.user.id
