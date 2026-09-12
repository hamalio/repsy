from infrastructure.database.repo.base import BaseRepo
from infrastructure.database.repo.users import UsersRepo

class RequestsRepo(BaseRepo):
    @property
    def users(self) -> UsersRepo:
        return UsersRepo(self.session)
    