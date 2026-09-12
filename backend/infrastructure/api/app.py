import logging
from config import load_config
from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware

from infrastructure.api.routers import users

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(filename)s:%(lineno)d #%(levelname)-8s [%(asctime)s] - %(name)s - %(message)s",
    )
    logger = logging.getLogger(__name__)
    logger.info("Starting API server")


# Setup logging
setup_logging()


app = FastAPI(
    title="Repsy",
    description="API for the Repsy Telegram Mini App: learning English vocabulary with spaced repetition",
    docs_url="/api/docs",
)


config = load_config(".env")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors.allow_origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Create main API router with prefix
api_router = APIRouter(prefix="/api")

api_router.include_router(users.router, prefix="")

# Add API router to main app
app.include_router(api_router)
