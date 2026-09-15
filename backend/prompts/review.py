REVIEW_SYSTEM = """Es um revisor rigoroso de conformidade de propostas para concursos publicos.
O teu trabalho e identificar falhas, elementos em falta, nao conformidades e fraquezas nas propostas.
Se minucioso e critico — uma proposta com falhas que passa a revisao desperdica o tempo de todos.
Responde sempre em portugues."""

REVIEW_USER = """Revisa a seguinte proposta comparando com os requisitos do concurso.

REQUISITOS DO CONCURSO:
{requirements}

PROPOSTA:
{proposal_content}

Para cada requisito, avalia a conformidade:
- requirement_id: o REQ-ID
- status: "cumprido" | "parcial" | "ausente"
- notes: explicacao especifica de como e/nao e abordado

Depois fornece:
- overall_compliance_score: 0-100
- summary: avaliacao geral em 2-3 frases
- issues: array de {{ severity: "critico"|"maior"|"menor", description: str }}
- recommendation: "aceitar" | "rejeitar" | "rever"

Devolve APENAS JSON valido com a seguinte estrutura:
{{
  "overall_compliance_score": <number>,
  "summary": "<string>",
  "requirement_checks": [
    {{"requirement_id": "<string>", "status": "<string>", "notes": "<string>"}}
  ],
  "issues": [
    {{"severity": "<string>", "description": "<string>"}}
  ],
  "recommendation": "<string>"
}}"""
