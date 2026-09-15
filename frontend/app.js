const API = "/api/v1";

async function api(path, options = {}) {
    const res = await fetch(API + path, {
        headers: { "Content-Type": "application/json", ...options.headers },
        ...options,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Erro desconhecido" }));
        throw new Error(err.detail || `Erro ${res.status}`);
    }
    return res.json();
}

function showToast(message, type = "error") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    const colors = { error: "bg-red-500", success: "bg-green-500", info: "bg-indigo-500" };
    toast.className = `${colors[type] || colors.info} text-white px-5 py-3 rounded-lg shadow-lg fade-in text-sm font-medium max-w-sm`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = "opacity 0.3s";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function showLoading(text = "A processar...") {
    document.getElementById("loading-text").textContent = text;
    document.getElementById("loading-overlay").classList.remove("hidden");
}
function hideLoading() {
    document.getElementById("loading-overlay").classList.add("hidden");
}

const STATUS_LABELS = {
    draft: "Rascunho", analyzed: "Analisado",
    proposal_generated: "Proposta Gerada", reviewed: "Revisto",
    accepted: "Aceite", rejected: "Rejeitado",
};
function statusLabel(s) { return STATUS_LABELS[s] || s; }

const appEl = document.getElementById("app");
function navigate(hash) { window.location.hash = hash; }
window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);

function route() {
    const hash = window.location.hash || "#/";
    const parts = hash.slice(2).split("/");
    if (parts[0] === "" || parts[0] === undefined) renderDashboard();
    else if (parts[0] === "tenders" && parts[1] === "new") renderNewTender();
    else if (parts[0] === "tenders" && parts[1]) renderTenderDetail(parseInt(parts[1]));
    else if (parts[0] === "proposals" && parts[1]) renderProposalView(parseInt(parts[1]));
    else renderDashboard();
}

async function renderDashboard() {
    appEl.innerHTML = `
        <div class="fade-in">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Concursos</h1>
                    <p class="text-gray-500 mt-1">Gerencie os seus concursos e propostas com IA</p>
                </div>
                <a href="#/tenders/new" class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">+ Novo Concurso</a>
            </div>
            <div id="tender-list" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <p class="text-gray-400 col-span-full text-center py-12">A carregar...</p>
            </div>
        </div>`;
    try {
        const tenders = await api("/tenders");
        const listEl = document.getElementById("tender-list");
        if (tenders.length === 0) {
            listEl.innerHTML = `
                <div class="col-span-full text-center py-16">
                    <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                    <p class="text-gray-500 mt-4 text-lg">Nenhum concurso encontrado</p>
                    <p class="text-gray-400 mt-1">Crie o seu primeiro concurso para comecar.</p>
                </div>`;
            return;
        }
        listEl.innerHTML = tenders.map(t => `
            <a href="#/tenders/${t.id}" class="block bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all">
                <div class="flex items-start justify-between mb-3">
                    <h3 class="font-semibold text-gray-900 line-clamp-2">${esc(t.title)}</h3>
                    <span class="badge badge-${t.status} ml-2 shrink-0">${statusLabel(t.status)}</span>
                </div>
                <p class="text-sm text-gray-400">${new Date(t.created_at).toLocaleDateString("pt-PT")}</p>
            </a>`).join("");
    } catch (e) { showToast(e.message); }
}

function renderNewTender() {
    appEl.innerHTML = `
        <div class="fade-in max-w-3xl mx-auto">
            <a href="#/" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-6 inline-block">&larr; Voltar</a>
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Novo Concurso</h1>
            <form id="tender-form" class="space-y-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Titulo do Concurso</label>
                    <input type="text" id="tender-title" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Ex: Fornecimento de Equipamento Informatico">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Texto do Concurso / Caderno de Encargos</label>
                    <textarea id="tender-text" rows="14" required class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-y" placeholder="Cole aqui o texto completo do concurso publico..."></textarea>
                </div>
                <div class="flex gap-3">
                    <button type="submit" class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Criar e Analisar</button>
                    <a href="#/" class="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancelar</a>
                </div>
            </form>
        </div>`;
    document.getElementById("tender-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("tender-title").value.trim();
        const raw_text = document.getElementById("tender-text").value.trim();
        if (!title || !raw_text) return;
        try {
            showLoading("A criar concurso...");
            const tender = await api("/tenders", { method: "POST", body: JSON.stringify({ title, raw_text }) });
            showLoading("A analisar requisitos com IA...");
            await api(`/tenders/${tender.id}/analyze`, { method: "POST" });
            hideLoading();
            showToast("Concurso criado e analisado com sucesso!", "success");
            navigate(`/tenders/${tender.id}`);
        } catch (e) { hideLoading(); showToast(e.message); }
    });
}

async function renderTenderDetail(id) {
    appEl.innerHTML = `<div class="fade-in"><p class="text-gray-400 text-center py-12">A carregar...</p></div>`;
    try {
        const tender = await api(`/tenders/${id}`);
        const proposals = await api(`/tenders/${id}/proposals`);
        let requirements = [];
        if (tender.extracted_requirements) {
            try { requirements = JSON.parse(tender.extracted_requirements); } catch (_) {}
        }
        appEl.innerHTML = `
            <div class="fade-in">
                <a href="#/" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-6 inline-block">&larr; Voltar</a>
                <div class="flex items-start justify-between mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">${esc(tender.title)}</h1>
                        <span class="badge badge-${tender.status} mt-2">${statusLabel(tender.status)}</span>
                    </div>
                    <button id="btn-delete" class="text-red-500 hover:text-red-700 text-sm font-medium">Eliminar</button>
                </div>
                <details class="bg-white rounded-xl border border-gray-200 mb-6">
                    <summary class="px-5 py-3 cursor-pointer font-medium text-gray-700 hover:text-gray-900">Texto Original do Concurso</summary>
                    <div class="px-5 pb-4">
                        <pre class="whitespace-pre-wrap text-sm text-gray-600 max-h-80 overflow-y-auto">${esc(tender.raw_text)}</pre>
                    </div>
                </details>
                ${requirements.length > 0 ? `
                <div class="bg-white rounded-xl border border-gray-200 mb-6">
                    <div class="px-5 py-4 border-b border-gray-100"><h2 class="font-semibold text-gray-900">Requisitos Extraidos (${requirements.length})</h2></div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="bg-gray-50 text-gray-600 text-left">
                                <tr><th class="px-4 py-2.5 font-medium">ID</th><th class="px-4 py-2.5 font-medium">Categoria</th><th class="px-4 py-2.5 font-medium">Descricao</th><th class="px-4 py-2.5 font-medium">Obrigatorio</th><th class="px-4 py-2.5 font-medium">Peso</th></tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${requirements.map(r => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-2.5 font-mono text-xs text-indigo-600">${esc(r.id)}</td>
                                    <td class="px-4 py-2.5 capitalize">${esc(r.category)}</td>
                                    <td class="px-4 py-2.5">${esc(r.description)}</td>
                                    <td class="px-4 py-2.5">${r.mandatory ? '<span class="badge badge-critico">Sim</span>' : '<span class="badge badge-menor">Nao</span>'}</td>
                                    <td class="px-4 py-2.5 capitalize">${esc(r.evaluation_weight)}</td>
                                </tr>`).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>` : tender.status === "draft" ? `
                <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6">
                    <p class="text-yellow-800">Concurso ainda nao foi analisado.</p>
                    <button id="btn-analyze" class="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors text-sm">Analisar Agora</button>
                </div>` : ""}
                ${tender.status !== "draft" ? `
                <div class="bg-white rounded-xl border border-gray-200 mb-6 p-5">
                    <h2 class="font-semibold text-gray-900 mb-3">Gerar Nova Proposta</h2>
                    <textarea id="guidance-input" rows="3" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-y mb-3" placeholder="Orientacoes opcionais (ex: focar na experiencia tecnica, precos competitivos...)"></textarea>
                    <button id="btn-generate" class="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm">Gerar Proposta com IA</button>
                </div>` : ""}
                ${proposals.length > 0 ? `
                <div class="bg-white rounded-xl border border-gray-200">
                    <div class="px-5 py-4 border-b border-gray-100"><h2 class="font-semibold text-gray-900">Propostas (${proposals.length})</h2></div>
                    <div class="divide-y divide-gray-100">
                        ${proposals.map(p => `
                        <a href="#/proposals/${p.id}" class="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                            <div>
                                <span class="font-medium text-gray-900">Versao ${p.version}</span>
                                <span class="text-sm text-gray-400 ml-3">${new Date(p.created_at).toLocaleString("pt-PT")}</span>
                            </div>
                            <span class="badge badge-${p.status}">${statusLabel(p.status)}</span>
                        </a>`).join("")}
                    </div>
                </div>` : ""}
            </div>`;

        document.getElementById("btn-delete")?.addEventListener("click", async () => {
            if (!confirm("Tem a certeza que deseja eliminar este concurso?")) return;
            try {
                await api(`/tenders/${id}`, { method: "DELETE" });
                showToast("Concurso eliminado", "success");
                navigate("/");
            } catch (e) { showToast(e.message); }
        });
        document.getElementById("btn-analyze")?.addEventListener("click", async () => {
            try {
                showLoading("A analisar requisitos com IA...");
                await api(`/tenders/${id}/analyze`, { method: "POST" });
                hideLoading();
                showToast("Analise concluida!", "success");
                renderTenderDetail(id);
            } catch (e) { hideLoading(); showToast(e.message); }
        });
        document.getElementById("btn-generate")?.addEventListener("click", async () => {
            const guidance = document.getElementById("guidance-input")?.value.trim() || null;
            try {
                showLoading("A gerar proposta com IA... (pode demorar ate 1 minuto)");
                const body = guidance ? { guidance } : {};
                await api(`/tenders/${id}/proposals/generate`, { method: "POST", body: JSON.stringify(body) });
                hideLoading();
                showToast("Proposta gerada com sucesso!", "success");
                renderTenderDetail(id);
            } catch (e) { hideLoading(); showToast(e.message); }
        });
    } catch (e) {
        showToast(e.message);
        appEl.innerHTML = `<p class="text-red-500 text-center py-12">${esc(e.message)}</p>`;
    }
}

async function renderProposalView(id) {
    appEl.innerHTML = `<div class="fade-in"><p class="text-gray-400 text-center py-12">A carregar...</p></div>`;
    try {
        const proposal = await api(`/proposals/${id}`);
        const reviews = await api(`/proposals/${id}/reviews`);
        const latestReview = reviews.length > 0 ? reviews[0] : null;
        let reqChecks = [], issues = [];
        if (latestReview) {
            try { reqChecks = JSON.parse(latestReview.requirement_checks); } catch (_) {}
            try { issues = JSON.parse(latestReview.issues_found); } catch (_) {}
        }
        const scoreClass = latestReview
            ? latestReview.compliance_score >= 80 ? "score-high"
            : latestReview.compliance_score >= 60 ? "score-medium" : "score-low"
            : "";
        appEl.innerHTML = `
            <div class="fade-in">
                <a href="#/tenders/${proposal.tender_id}" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-6 inline-block">&larr; Voltar ao Concurso</a>
                <div class="flex items-start justify-between mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Proposta &mdash; Versao ${proposal.version}</h1>
                        <span class="badge badge-${proposal.status} mt-2">${statusLabel(proposal.status)}</span>
                    </div>
                    <div class="flex gap-2">
                        ${proposal.status !== "accepted" ? `<button id="btn-review" class="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm">Rever Proposta</button>` : ""}
                        <button id="btn-regen" class="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm">Regenerar</button>
                    </div>
                </div>
                <div id="regen-section" class="hidden bg-white rounded-xl border border-gray-200 mb-6 p-5">
                    <h3 class="font-semibold text-gray-900 mb-2">Feedback para Regeneracao</h3>
                    <textarea id="regen-feedback" rows="3" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-y mb-3" placeholder="Descreva o que deve ser melhorado..."></textarea>
                    <button id="btn-regen-submit" class="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm">Regenerar com Feedback</button>
                </div>
                ${latestReview ? `
                <div class="bg-white rounded-xl border border-gray-200 mb-6">
                    <div class="px-5 py-4 border-b border-gray-100"><h2 class="font-semibold text-gray-900">Resultado da Revisao</h2></div>
                    <div class="p-5">
                        <div class="flex items-start gap-6 mb-6">
                            <div class="score-gauge ${scoreClass}">${Math.round(latestReview.compliance_score)}%</div>
                            <div class="flex-1">
                                <p class="text-gray-700 mb-3">${esc(latestReview.summary)}</p>
                                <div class="flex gap-2">
                                    <span class="badge badge-${latestReview.recommendation === 'aceitar' ? 'accepted' : latestReview.recommendation === 'rejeitar' ? 'rejected' : 'analyzed'}">Recomendacao: ${esc(latestReview.recommendation)}</span>
                                </div>
                            </div>
                        </div>
                        ${proposal.status === "reviewed" ? `
                        <div class="flex gap-3 mb-6 pb-6 border-b border-gray-100">
                            <button id="btn-accept" class="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">Aceitar Proposta</button>
                            <button id="btn-reject" class="bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm">Rejeitar Proposta</button>
                        </div>` : ""}
                        ${reqChecks.length > 0 ? `
                        <h3 class="font-semibold text-gray-900 mb-3">Verificacao por Requisito</h3>
                        <div class="space-y-2 mb-6">
                            ${reqChecks.map(rc => `
                            <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                                <span class="badge badge-${rc.status} shrink-0 mt-0.5">${esc(rc.status)}</span>
                                <div>
                                    <span class="font-mono text-xs text-indigo-600">${esc(rc.requirement_id)}</span>
                                    <p class="text-sm text-gray-600 mt-0.5">${esc(rc.notes)}</p>
                                </div>
                            </div>`).join("")}
                        </div>` : ""}
                        ${issues.length > 0 ? `
                        <h3 class="font-semibold text-gray-900 mb-3">Problemas Encontrados</h3>
                        <div class="space-y-2">
                            ${issues.map(issue => `
                            <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                                <span class="badge badge-${issue.severity} shrink-0 mt-0.5">${esc(issue.severity)}</span>
                                <p class="text-sm text-gray-600">${esc(issue.description)}</p>
                            </div>`).join("")}
                        </div>` : ""}
                    </div>
                </div>` : ""}
                <div class="bg-white rounded-xl border border-gray-200">
                    <div class="px-5 py-4 border-b border-gray-100"><h2 class="font-semibold text-gray-900">Conteudo da Proposta</h2></div>
                    <div class="prose p-5">${marked.parse(proposal.content)}</div>
                </div>
            </div>`;

        document.getElementById("btn-review")?.addEventListener("click", async () => {
            try {
                showLoading("A rever proposta com IA...");
                await api(`/proposals/${id}/review`, { method: "POST" });
                hideLoading();
                showToast("Revisao concluida!", "success");
                renderProposalView(id);
            } catch (e) { hideLoading(); showToast(e.message); }
        });
        document.getElementById("btn-regen")?.addEventListener("click", () => {
            document.getElementById("regen-section").classList.toggle("hidden");
        });
        document.getElementById("btn-regen-submit")?.addEventListener("click", async () => {
            const feedback = document.getElementById("regen-feedback").value.trim();
            if (!feedback) { showToast("Introduza feedback para a regeneracao.", "info"); return; }
            try {
                showLoading("A regenerar proposta com IA...");
                const newProposal = await api(`/proposals/${id}/regenerate`, { method: "POST", body: JSON.stringify({ feedback }) });
                hideLoading();
                showToast("Nova versao gerada!", "success");
                navigate(`/proposals/${newProposal.id}`);
            } catch (e) { hideLoading(); showToast(e.message); }
        });
        document.getElementById("btn-accept")?.addEventListener("click", async () => {
            if (!latestReview) return;
            try {
                await api(`/reviews/${latestReview.id}/decision`, { method: "POST", body: JSON.stringify({ decision: "accept" }) });
                showToast("Proposta aceite!", "success");
                renderProposalView(id);
            } catch (e) { showToast(e.message); }
        });
        document.getElementById("btn-reject")?.addEventListener("click", async () => {
            if (!latestReview) return;
            try {
                await api(`/reviews/${latestReview.id}/decision`, { method: "POST", body: JSON.stringify({ decision: "reject" }) });
                showToast("Proposta rejeitada.", "info");
                renderProposalView(id);
            } catch (e) { showToast(e.message); }
        });
    } catch (e) {
        showToast(e.message);
        appEl.innerHTML = `<p class="text-red-500 text-center py-12">${esc(e.message)}</p>`;
    }
}

function esc(str) {
    if (str == null) return "";
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
}
