import json
from redis import Redis
from typing import Optional
from datetime import timedelta


class RedisCache:
    def __init__(self, host: str = "localhost", port: int = 6379, db: int = 0):
        self.redis = Redis(host=host, port=port, db=db, decode_responses=True)
        self.expiry_time = timedelta(hours=24)

    def get(self, key: str) -> Optional[dict]:
        data = self.redis.get(key)
        return json.loads(data) if data else None

    def set(self, key: str, value: dict):
        self.redis.setex(name=key, time=self.expiry_time, value=json.dumps(value))
