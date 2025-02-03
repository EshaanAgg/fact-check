import httpx
from fastapi import HTTPException


class OllamaService:
    def __init__(self, base_url: str = "http://localhost:11434"):
        self.base_url = base_url
        self.model = "mistral"

    async def generate_response(self, prompt: str) -> str:
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/api/chat",
                    json={
                        "model": self.model,
                        "messages": [
                            {
                                "role": "system",
                                "content": """You are a fact checking assistant. The user will give you some statements (tweets) and if they have some context about the content you the tweet. You need to determine if it is true, false, or unverifiable. 
                                
Provide your response in exactly this format, with each element on a new line:
- First line: Either "true", "false", or "unverifiable"
- Second line: A number between 1 and 100 representing your confidence
- Third line: A brief explanation of your reasoning. Keep this within 40-50 words.""",
                            },
                            {
                                "role": "user",
                                "content": prompt,
                            },
                        ],
                        "stream": False,
                    },
                )

                if response.status_code != 200:
                    error_detail = f"LLM service error: Status {response.status_code}"
                    try:
                        error_detail += f" - {response.json()}"
                    except:
                        error_detail += f" - {response.text}"
                    raise HTTPException(status_code=500, detail=error_detail)

                return response.json()["message"]["content"]

            except httpx.RequestError as e:
                print("[ERROR in LLM service]: Connection error:", str(e))
                raise HTTPException(
                    status_code=500, detail="Failed to connect to LLM service"
                )
