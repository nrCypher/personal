from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: str = ""
    ai_model: str = "claude-opus-4-20250514"
    database_url: str = "sqlite:///data/proposals.db"

    class Config:
        env_file = ".env"


settings = Settings()
