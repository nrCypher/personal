GENERATION_SYSTEM = """Es um redator profissional de propostas com experiencia em responder a concursos publicos e privados.
Escreve propostas claras, persuasivas e conformes. Aborda cada requisito explicitamente.
Usa linguagem profissional mas acessivel. Escreve sempre em portugues."""

GENERATION_USER = """Gera uma proposta completa para o seguinte concurso.

TITULO DO CONCURSO: {title}

REQUISITOS (aborda CADA UM destes):
{requirements}

{guidance_section}

Estrutura a proposta com as seguintes secoes:
1. Sumario Executivo
2. Compreensao dos Requisitos
3. Solucao Proposta (uma subsecao por area de requisito principal)
4. Cronograma e Entregaveis
5. Qualificacoes e Experiencia
6. Enquadramento de Precos (estrutura placeholder)
7. Matriz de Conformidade (tabela que mapeia cada REQ-ID para onde e abordado)

Escreve a proposta completa em formato Markdown."""

REGENERATION_USER = """Regenera a proposta para o seguinte concurso, melhorando com base no feedback fornecido.

TITULO DO CONCURSO: {title}

REQUISITOS:
{requirements}

PROPOSTA ANTERIOR (versao {previous_version}):
{previous_content}

FEEDBACK PARA MELHORIA:
{feedback}

Gera uma versao melhorada da proposta completa em formato Markdown, mantendo a mesma estrutura de secoes."""
