from typing import Literal
from pydantic import BaseModel

from cache import RedisCache
from llm import OllamaService


class FactCheckResponse(BaseModel):
    type: Literal["true", "false", "unverifiable"]
    confidence: int
    description: str


class FactCheckService:
    def __init__(self, cache: RedisCache, llm: OllamaService):
        self.cache = cache
        self.llm = llm

    def _generate_prompt(self, text: str) -> str:
        return f"""
<statement-to-analyze>
{text}
</statement-to-analyze>

<context>
</context>
"""

    def _parse_llm_response(self, response: str) -> FactCheckResponse:
        try:
            lines = [
                line.strip() for line in response.strip().split("\n") if line.strip()
            ]

            # Validate response type
            type_str = lines[0].lower()
            if type_str not in ["true", "false", "unverifiable"]:
                raise ValueError(f"Invalid response type: {type_str}")

            # Validate confidence
            confidence = int(lines[1])
            if not 1 <= confidence <= 100:
                raise ValueError(
                    f"Confidence must be between 1 and 100, got: {confidence}"
                )

            return FactCheckResponse(
                type=type_str,
                confidence=confidence,
                description=lines[2],
            )
        except Exception as e:
            raise ValueError(f"Failed to parse LLM response: {str(e)}")

    async def check_fact(self, text: str) -> FactCheckResponse:
        # Check cache first
        cache_key = f"fact_check:{hash(text)}"
        cached_result = self.cache.get(cache_key)

        if cached_result:
            print("[CACHE] Hit")
            return FactCheckResponse(**cached_result)

        # Generate new response if not in cache
        prompt = self._generate_prompt(text)
        llm_response = await self.llm.generate_response(prompt)
        print("[LLM] Response:", llm_response)
        result = self._parse_llm_response(llm_response)

        # Cache the result
        self.cache.set(cache_key, result.model_dump())

        return result
