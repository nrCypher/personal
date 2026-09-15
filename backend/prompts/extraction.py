EXTRACTION_SYSTEM = """Es um analista de contratacao publica especializado em analise de concursos e cadernos de encargos.
Extrai todos os requisitos, criterios e entregaveis do documento do concurso.
Se exaustivo — falhar um requisito significa uma proposta nao conforme.
Responde sempre em portugues."""

EXTRACTION_USER = """Analisa o seguinte documento de concurso e extrai todos os requisitos.

Para cada requisito, fornece:
- id: um identificador curto (REQ-001, REQ-002, ...)
- category: uma de [eligibilidade, tecnico, financeiro, documentacao, prazo, legal]
- description: o que e exigido
- mandatory: true/false (e um criterio eliminatorio?)
- evaluation_weight: importancia estimada (alta/media/baixa)

Devolve APENAS JSON valido como um array de objetos de requisito. Sem texto adicional.

DOCUMENTO DO CONCURSO:
{tender_text}"""
