import json
import re
import time

import anthropic

from backend.config import settings
from backend.prompts.extraction import EXTRACTION_SYSTEM, EXTRACTION_USER
from backend.prompts.generation import (
    GENERATION_SYSTEM,
    GENERATION_USER,
    REGENERATION_USER,
)
from backend.prompts.review import REVIEW_SYSTEM, REVIEW_USER


class AIService:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        self.model = settings.ai_model

    def _call(self, system: str, user_message: str, max_tokens: int = 4096) -> str:
        for attempt in range(3):
            try:
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=max_tokens,
                    system=system,
                    messages=[{"role": "user", "content": user_message}],
                )
                return response.content[0].text
            except anthropic.APIError:
                if attempt < 2:
                    time.sleep(2 ** attempt)
                else:
                    raise

    def _parse_json(self, text: str) -> dict | list:
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            pass
        match = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
        if match:
            return json.loads(match.group(1).strip())
        for i, ch in enumerate(text):
            if ch in ("[", "{"):
                try:
                    return json.loads(text[i:])
                except json.JSONDecodeError:
                    continue
        raise ValueError(f"Nao foi possivel extrair JSON da resposta: {text[:200]}")

    def extract_requirements(self, tender_text: str) -> str:
        prompt = EXTRACTION_USER.format(tender_text=tender_text)
        raw = self._call(EXTRACTION_SYSTEM, prompt, max_tokens=4096)
        parsed = self._parse_json(raw)
        return json.dumps(parsed, ensure_ascii=False)

    def generate_proposal(self, title: str, requirements: str, guidance: str | None = None) -> str:
        guidance_section = ""
        if guidance:
            guidance_section = f"ORIENTACAO DO UTILIZADOR: {guidance}"
        prompt = GENERATION_USER.format(
            title=title,
            requirements=requirements,
            guidance_section=guidance_section,
        )
        return self._call(GENERATION_SYSTEM, prompt, max_tokens=8192)

    def regenerate_proposal(self, title, requirements, previous_content, previous_version, feedback) -> str:
        prompt = REGENERATION_USER.format(
            title=title,
            requirements=requirements,
            previous_content=previous_content,
            previous_version=previous_version,
            feedback=feedback,
        )
        return self._call(GENERATION_SYSTEM, prompt, max_tokens=8192)

    def review_proposal(self, requirements: str, proposal_content: str) -> dict:
        prompt = REVIEW_USER.format(requirements=requirements, proposal_content=proposal_content)
        raw = self._call(REVIEW_SYSTEM, prompt, max_tokens=4096)
        return self._parse_json(raw)
