document.getElementById('toggle-sidebar').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('open');
});
function logout() {
    localStorage.removeItem('token');
    window.location.href = '../index.html'; 
}

document.getElementById('logout').addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', () => {
    const approveBtn = document.querySelector('.approve-btn');
    const rejectBtn = document.querySelector('.reject-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    approveBtn.addEventListener('click', () => {
        alert('Solicitação APROVADA! Enviando dados...');
    });

    rejectBtn.addEventListener('click', () => {
        alert('Solicitação REJEITADA! Enviando dados...');
    });

    prevBtn.addEventListener('click', () => {
        alert('Voltando para a solicitação anterior (implementação real requer dados)');
    });

    nextBtn.addEventListener('click', () => {
        alert('Avançando para a próxima solicitação (implementação real requer dados)');
    });
});
function carregarPerfil() {

    const nomeSalvo = localStorage.getItem('gestor_nome');
    const emailSalvo = localStorage.getItem('gestor_email');
    const telefoneSalvo = localStorage.getItem('gestor_telefone');
    const matriculaSalva = localStorage.getItem('gestor_matricula');
    const funcaoSalva = localStorage.getItem('gestor_funcao');
    const setorSalvo = localStorage.getItem('gestor_setor');
    const unidadeSalva = localStorage.getItem('gestor_unidade');


    if (nomeSalvo) {
        document.getElementById('profile-name').textContent = nomeSalvo;
    }
    if (emailSalvo) {
        document.getElementById('profile-email').textContent = emailSalvo;
    }
    if (telefoneSalvo) {
        document.getElementById('profile-telefone').textContent = telefoneSalvo;
    }
    if (matriculaSalva) {
        document.getElementById('profile-matricula').textContent = matriculaSalva;
    }
    if (funcaoSalva) {
        document.getElementById('profile-funcao').textContent = funcaoSalva;
    }
    if (setorSalvo) {
        document.getElementById('profile-setor').textContent = setorSalvo;
    }
    if (unidadeSalva) {
        document.getElementById('profile-unidade').textContent = unidadeSalva;
    }
}
carregarPerfil();
const nomeInput = document.getElementById('edit-nome');
const emailInput = document.getElementById('edit-email');
const telefoneInput = document.getElementById('edit-telefone');
const matriculaInput = document.getElementById('edit-matricula');
const funcaoInput = document.getElementById('edit-funcao');
const saveButton = document.getElementById('btn-salvar');

function carregarFormulario() {
    nomeInput.value = localStorage.getItem('gestor_nome') || "Nome do Gestor";
    emailInput.value = localStorage.getItem('gestor_email') || "gestor.nome@fortes.com.br";
    telefoneInput.value = localStorage.getItem('gestor_telefone') || "(27) 99999-9999";

    matriculaInput.value = localStorage.getItem('gestor_matricula') || "45678";
    funcaoInput.value = localStorage.getItem('gestor_funcao') || "Técnico de Manutenção Sênior";
}

function salvarFormulario() {
    localStorage.setItem('gestor_nome', nomeInput.value);
    localStorage.setItem('gestor_email', emailInput.value);
    localStorage.setItem('gestor_telefone', telefoneInput.value);

    localStorage.setItem('gestor_matricula', matriculaInput.value);
    localStorage.setItem('gestor_funcao', funcaoInput.value);

    localStorage.setItem('gestor_setor', localStorage.getItem('gestor_setor') || "Elétrica");
    localStorage.setItem('gestor_unidade', localStorage.getItem('gestor_unidade') || "Matriz - Vitória");


    alert('Perfil salvo com sucesso!');

    window.location.href = 'gestor.html';
}
carregarFormulario();

if (saveButton) {
    saveButton.addEventListener('click', salvarFormulario);
}
function enableAutoGrow(selector) {
    const areas = document.querySelectorAll(selector);
    areas.forEach(area => {
        area.style.height = 'auto';
        area.style.height = area.scrollHeight + 'px';

        const onInput = e => {
            const ta = e.target;
            ta.style.height = 'auto';
            ta.style.height = ta.scrollHeight + 'px';
        };
        area.addEventListener('input', onInput);
    });
}
enableAutoGrow('.auto-grow');
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const notificationsContent = document.getElementById('notifications-content');

    const mockNotifications = {
        'pendentes': [
            { id: 421, nome: "Nome Solicitação", data: "12/12/25", hora: "18:00 as 19:00", justificativa: "Justificativa de Pedro S." },
            { id: 422, nome: "Outra Solicitação", data: "13/12/25", hora: "19:00 as 20:00", justificativa: "Justificativa de Maria P." }
        ],
        'aprovadas': [
            { id: 419, nome: "Solicitação Antiga A", data: "01/12/25", hora: "14:00 as 15:00", justificativa: "Revisão OK" },
            { id: 418, nome: "Solicitação Antiga B", data: "02/12/25", hora: "15:00 as 16:00", justificativa: "Confirmada" }
        ],
        'reprovadas': [
            { id: 417, nome: "Solicitação Negada", data: "03/12/25", hora: "08:00 as 09:00", justificativa: "Fora do prazo" }
        ]
    };


    const renderActionArea = (status, isDetailView = false) => {
        if (status === 'pendentes') {
            if (isDetailView) {
                return `
                    <div class="item-actions detail-actions">
                        <button class="btn-action btn-approve" data-action="aprovar">Aprovar</button>
                        <button class="btn-action btn-reject" data-action="reprovar">Reprovar</button>
                        <button class="btn-action btn-back" data-action="voltar">Voltar</button>
                    </div>
                `;
            } else {
                // Botões de ação padrão para Pendentes
                return `
                    <div class="item-actions">
                        <button class="btn-action btn-approve" data-action="aprovar">Aprovar</button>
                        <button class="btn-action btn-reject" data-action="reprovar">Reprovar</button>
                        <button class="btn-link" data-action="detalhes">Ver detalhes</button>
                    </div>
                `;
            }
        } else {
            const label = status === 'aprovadas' ? 'Aprovada' : 'Reprovada';
            const statusClass = status === 'aprovadas' ? 'status-approved' : 'status-rejected';

            return `
                <div class="item-status-display ${statusClass}">
                    <p>${label}</p>
                    <button class="btn-link" data-action="detalhes">Ver detalhes</button>
                </div>
            `;
        }
    };

    const createNotificationHTML = (notification, status, isDetailView = false) => {
        const justification = isDetailView
            ? notification.justificativa + ' Completa' 
            : notification.justificativa;

        const displayStyle = isDetailView ? 'style="display: none;"' : '';
        const detailClass = isDetailView ? 'hidden-detail' : '';

        return `
            <div class="notification-item ${detailClass}" data-id="${notification.id}" data-status="${status}" ${displayStyle}>
                <div class="item-details">
                    <p class="item-number">Nº ${notification.id}</p>
                    <p class="item-name">${notification.nome}</p>
                    <p class="item-date-time">${notification.data}</p>
                    <p class="item-date-time">${notification.hora}</p>
                    <p class="item-justification">${justification}</p>
                </div>
                ${renderActionArea(status, isDetailView)} </div>
        `;
    };



    const renderNotifications = (status) => {
        const list = mockNotifications[status] || [];
        let htmlContent = '';

        list.forEach(item => {
            htmlContent += createNotificationHTML(item, status);
        });

        if (status === 'pendentes' && list.length > 0) {
            htmlContent += createNotificationHTML(list[0], status, true);
        }

        notificationsContent.innerHTML = htmlContent;
    };


    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const status = e.target.getAttribute('data-status');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            renderNotifications(status);
        });
    });

    notificationsContent.addEventListener('click', (e) => {
        const target = e.target;
        const action = target.getAttribute('data-action');
        const item = target.closest('.notification-item');

        if (!action) return;

        const isPendingList = item && item.getAttribute('data-status') === 'pendentes';
        const normalItems = notificationsContent.querySelectorAll('.notification-item:not(.hidden-detail)');
        const detailItem = notificationsContent.querySelector('.notification-item.hidden-detail');

        if (action === 'aprovar' || action === 'reprovar') {
            if (isPendingList) {
                alert(`${action === 'aprovar' ? 'Aprovação' : 'Reprovação'} simulada para ${item.querySelector('.item-name').textContent}.`);
                item.remove();

                if (item.classList.contains('hidden-detail')) {
                    normalItems.forEach(n => n.style.display = 'flex');
                }
            }
        } else if (action === 'detalhes') {
            alert('Simulando visualização de Detalhes. Pressione "Voltar" para retornar.');

            normalItems.forEach(n => n.style.display = 'none');
            if (detailItem) detailItem.style.display = 'flex';

        } else if (action === 'voltar') {
            alert('Voltando para a lista normal.');
            normalItems.forEach(n => n.style.display = 'flex');
            if (detailItem) detailItem.style.display = 'none';
        }
    });

    document.querySelector('.tab-button[data-status="pendentes"]').classList.add('active');
    renderNotifications('pendentes');
});
const allNotifications = [
    { title: "Notificação sobre hora extra", body: "Sua solicitação #234 foi aprovado", date: "10:30", isRead: false },
    { title: "Notificação sobre folga no próximo feriado", body: "Sua solicitação #234 foi aprovado", date: "29/03", isRead: false },
    { title: "Notificação sobre hora extra", body: "Você foi chamado para participar de uma hora extra", date: "16/01", isRead: true },
    { title: "Alerta de sistema", body: "O servidor 01 será reiniciado em 5 minutos", date: "Ontem", isRead: false },
    { title: "Nova mensagem", body: "Você tem 3 novas mensagens na caixa de entrada", date: "15/12", isRead: true }
];

const notificationListElement = document.getElementById('notificationList');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

function renderNotifications(notifications) {
    notificationListElement.innerHTML = '';

    if (notifications.length === 0) {
        notificationListElement.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhuma notificação encontrada com o filtro atual.</p>';
        return;
    }

    notifications.forEach(notif => {
        const item = document.createElement('div');
        const readClass = notif.isRead ? 'read' : 'unread';
        item.className = `notification-item ${readClass}`;

        item.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-circle icon-alert"></i> 
                <div class="text-group">
                    <p class="title">${notif.title}</p>
                    <p class="body-text">${notif.body}</p>
                </div>
            </div>
            <span class="timestamp">${notif.date}</span>
        `;

        item.onclick = function () {
            if (notif.isRead) return;

            notif.isRead = true;
            item.classList.remove('unread');
            item.classList.add('read');

            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterNotifications(activeFilter);
        };

        notificationListElement.appendChild(item);
    });
}

function filterNotifications(filterType = null) {
    let currentFilter = filterType;

    if (!currentFilter) {
        currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter') || 'todas';
    }

    let filteredList = allNotifications;

    if (currentFilter === 'lidas') {
        filteredList = allNotifications.filter(notif => notif.isRead);
    } else if (currentFilter === 'nao-lidas') {
        filteredList = allNotifications.filter(notif => !notif.isRead);
    }

    const searchText = searchInput.value.toLowerCase();

    if (searchText) {
        filteredList = filteredList.filter(notif =>
            notif.title.toLowerCase().includes(searchText) ||
            notif.body.toLowerCase().includes(searchText)
        );
    }

    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderNotifications(filteredList);
}

document.addEventListener('DOMContentLoaded', () => {
    filterNotifications('todas');
});
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
        });

        if (!wasActive) {
            item.classList.add('active');
        }
    });
});
function darkModeToggle() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
function showpage(pageName) {
    const pages = document.querySelectorAll('.page');
    const body = document.body;

    pages.forEach(page => {
        page.classList.remove('active');
    });

    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    if (sidebar) {
        sidebar.classList.remove('open');
    }

}
showpage('dashboard')
document.addEventListener('DOMContentLoaded', () => {
    const noticiaForm = document.getElementById('noticia-form');

    if (noticiaForm) {
        noticiaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const titulo = document.getElementById('noticia-titulo').value;

            const conteudo = document.getElementById('noticia-conteudo').value;

            alert(`Notícia "${titulo}" publicada com sucesso! (Simulação)`);

            noticiaForm.reset();

            window.location.href = 'gestor.html'; 
        });
    }
});
// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    filterNotifications('todas'); // Carrega a aba 'Todas' ao iniciar
});