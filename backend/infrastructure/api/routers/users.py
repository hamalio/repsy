import logging
from aiogram.utils.web_app import WebAppUser
from fastapi import APIRouter, HTTPException

from infrastructure.api.dependencies import RepoDep, CurrentUserIdDep, CurrentTelegramUserDep
from infrastructure.api.types import (
    LanguageResponse,
    UserLanguageResponse,
    UserLanguageUpdate,
    UserMeResponse,
)
from infrastructure.database.repo.requests import RequestsRepo


router = APIRouter(tags=["Users"])


async def create_user_from_telegram(repo: RequestsRepo, telegram_user: WebAppUser, language_id: int):
    full_name = " ".join(filter(None, [telegram_user.first_name, telegram_user.last_name]))

    return await repo.users.create_user(
        user_id=telegram_user.id,
        full_name=full_name,
        language_id=language_id,
        username=telegram_user.username,
    )


@router.get("/languages", response_model=list[LanguageResponse])
async def get_languages(
    repo: RepoDep,
    _: CurrentUserIdDep,
):
    languages = await repo.users.get_languages()

    return [{"name": language.name, "code": language.code} for language in languages]


@router.post("/user/register", response_model=UserLanguageResponse)
async def register_user(
    repo: RepoDep,
    telegram_user: CurrentTelegramUserDep,
):
    """
    Called when the Mini App opens. Returns the user's language,
    or null when the user must pick one.
    """
    user = await repo.users.get_user_by_id(user_id=telegram_user.id)

    if user:
        language = await repo.users.get_language(language_id=user.language_id)
        return {"language_code": language.code}

    language_id = None
    if telegram_user.language_code:
        language_id = await repo.users.get_language_id(code=telegram_user.language_code)

    if language_id is None:
        return {"language_code": None}

    await create_user_from_telegram(repo, telegram_user, language_id)

    return {"language_code": telegram_user.language_code}


@router.put("/user/me/language", response_model=UserLanguageResponse)
async def set_user_language(
    body: UserLanguageUpdate,
    repo: RepoDep,
    telegram_user: CurrentTelegramUserDep,
):
    """
    Sets the user's language. Creates the user if they have not been registered yet.
    """
    language_id = await repo.users.get_language_id(code=body.language_code)

    if language_id is None:
        raise HTTPException(
            status_code=400,
            detail="Language is not supported",
        )

    user = await repo.users.get_user_by_id(user_id=telegram_user.id)

    if user is None:
        await create_user_from_telegram(repo, telegram_user, language_id)
    else:
        await repo.users.update_user_language(user.user_id, body.language_code)

    return {"language_code": body.language_code}


@router.get("/user/me", response_model=UserMeResponse)
async def get_me(
    repo: RepoDep,
    user_id: CurrentUserIdDep,
):
    user = await repo.users.get_user_by_id(user_id=user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    language = await repo.users.get_language(
        language_id=user.language_id,
    )

    return {
        "user_id": user.user_id,
        "username": user.username,
        "full_name": user.full_name,
        "language": language.name,
        "language_code": language.code,
    }
