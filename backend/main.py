import os
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException

from cache import RedisCache
from llm import OllamaService
from fact import FactCheckResponse, FactCheckService


class TweetRequest(BaseModel):
    text: str


class FactCheckAPI:
    def __init__(self):
        self.app = FastAPI(
            title="Fact Check API",
            description="A simple API to fact-check tweets using a LLMs model & advanced RAG capabilities.",
        )
        self.cache = RedisCache(
            host=os.getenv("REDIS_HOST", "localhost"),
            port=int(os.getenv("REDIS_PORT", 6379)),
        )
        self.llm = OllamaService(
            base_url=os.getenv("OLLAMA_URL", "http://localhost:11434")
        )
        self.service = FactCheckService(self.cache, self.llm)
        self._setup_routes()

    def _setup_routes(self):

        @self.app.post("/fact-check", response_model=FactCheckResponse)
        def fact_check(request: TweetRequest):
            print("[REQUEST]:", request.text)
            try:
                return self.service.check_fact(request.text)
            except ValueError as e:
                raise HTTPException(status_code=400, detail=str(e))
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))

        @self.app.get("/")
        async def root():
            return {"message": "Welcome to the Fact Check API!"}


def create_app() -> FastAPI:
    api = FactCheckAPI()
    return api.app


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:create_app",
        host="0.0.0.0",
        port=8000,
        workers=1,
        factory=True,
    )
