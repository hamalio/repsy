from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.dialects.postgresql import insert
from typing import TypeVar, Type, Any, Optional

ModelType = TypeVar("ModelType")

class BaseRepo:
    """
    A class representing a base repository for handling database operations.

    Attributes:
        session (AsyncSession): The database session used by the repository.
    """

    def __init__(self, session: AsyncSession):
        self.session: AsyncSession = session

    async def create(self, model_class: Type[ModelType], **values) -> ModelType:
        """Generic create method"""
        insert_stmt = (
            insert(model_class)
            .values(**values)
            .returning(model_class)
        )
        result = await self.session.execute(insert_stmt)
        await self.session.commit()
        return result.scalar_one()

    async def update(self, model_class: Type[ModelType], id_field: Any, id_value: Any, **values):
        """Generic update method"""
        statement = update(model_class).where(id_field == id_value).values(**values)
        await self.session.execute(statement)
        await self.session.commit()
        
    async def delete(self, model_class: Type[ModelType], id_field: Any, id_value: Any):
        """Generic delete method"""
        statement = delete(model_class).where(id_field == id_value)
        await self.session.execute(statement)
        await self.session.commit()

    async def get_one(self, model_class: Type[ModelType], id_field: Any, id_value: Any) -> Optional[ModelType]:
        """Generic get one method"""
        statement = select(model_class).where(id_field == id_value)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

    async def get_all(
        self, 
        model_class: Type[ModelType], 
        where_clause: Any,
        order_by_field: Any = None
    ) -> list[ModelType]:
        """Generic get all method"""
        query = select(model_class).where(where_clause)
        if order_by_field:
            query = query.order_by(order_by_field.desc())
        result = await self.session.execute(query)
        return result.scalars().all()