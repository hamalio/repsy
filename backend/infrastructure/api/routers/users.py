from fastapi import APIRouter, HTTPException

from infrastructure.api.dependencies import RepoDep, CurrentUserIdDep
from infrastructure.api.types import UserMeResponse


router = APIRouter(tags=["Users"])


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
