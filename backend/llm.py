import requests


class OllamaService:
    def __init__(self, base_url: str = "http://localhost:11434"):
        self.base_url = base_url
        self.model = "mistral"

    def generate_response(self, prompt: str) -> str:
        response = requests.post(
            f"{self.base_url}/api/chat",
            json={
                "model": self.model,
                "messages": [
                    {
                        "role": "system",
                        "content": """
You are a fact checking assistant. The user will give you some statements (tweets) and optionally some context (facts) about what is being talked about in the tweet. You need to determine if the text to analyze is true, false, or unverifiable. 

You can provide references from the context to support your decision.
                                
Provide your response in exactly this format, with each element on a new line:
- First line: Either "true", "false", or "unverifiable"
- Second line: A number between 1 and 100 representing your confidence
- Third line: A brief explanation of your reasoning. Keep this within 40-50 words.

Sample Request:
<statement-to-analyze>
The Earth is flat.
</statement-to-analyze>

<context>
The Earth is round.
</context>

Sample Response:
false
95
The Earth is round, and there is overwhelming evidence to support this. The statement is false.
""",
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

            print(
                "[LLM Error]: ",
                error_detail,
                response.json(),
                response.text,
            )
            raise ValueError(error_detail)

        return response.json()["message"]["content"]
