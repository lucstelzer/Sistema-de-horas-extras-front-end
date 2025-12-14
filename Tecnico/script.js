const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

showpage('dashboard');

function logout() {
    localStorage.removeItem('token');
    window.location.href = '../index.html'; 
}

document.getElementById('logout').addEventListener('click', logout);

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

function carregarPerfil() {

    const nomeSalvo = localStorage.getItem('tecnico_nome');
    const emailSalvo = localStorage.getItem('tecnico_email');
    const telefoneSalvo = localStorage.getItem('tecnico_telefone');
    const matriculaSalva = localStorage.getItem('tecnico_matricula');
    const funcaoSalva = localStorage.getItem('tecnico_funcao');
    const setorSalvo = localStorage.getItem('tecnico_setor');
    const unidadeSalva = localStorage.getItem('tecnico_unidade');


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
document.querySelectorAll('.complete-task').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const row = e.target.closest('tr');
        const taskName = row.querySelector('td:nth-child(2)').textContent.trim();

        const confirmationMessage = `Deseja realmente concluir a tarefa "${taskName}"? Esta ação é irreversível.`;

        if (confirm(confirmationMessage)) {

            row.querySelector('td:nth-child(4)').innerHTML = '<span class="status-badge completed">Concluída</span>';
            row.querySelector('td:nth-child(5)').textContent = '';
            row.classList.remove('approved', 'pending');

            const hoursText = row.querySelector('td:nth-child(3)').textContent;
            const taskHours = parseFloat(hoursText.replace('hrs', '').trim());

            let currentTotalText = pendingHoursElement.textContent.replace('hrs', '').trim();
            let currentTotal = parseFloat(currentTotalText) || 0;

            let newTotal = currentTotal - taskHours;
            pendingHoursElement.textContent = `${newTotal}hrs`;

            alert(`Tarefa "${taskName}" concluída e ${taskHours} horas deduzidas do total pendente.`);
        }
    });
});
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
const nomeInput = document.getElementById('edit-nome');
const emailInput = document.getElementById('edit-email');
const telefoneInput = document.getElementById('edit-telefone');
const matriculaInput = document.getElementById('edit-matricula');
const funcaoInput = document.getElementById('edit-funcao');
const saveButton = document.getElementById('btn-salvar');

function carregarFormulario() {
    nomeInput.value = localStorage.getItem('tecnico_nome') || "Nome do Técnico";
    emailInput.value = localStorage.getItem('tecnico_email') || "tecnico.nome@fortes.com.br";
    telefoneInput.value = localStorage.getItem('tecnico_telefone') || "(27) 99999-9999";

    matriculaInput.value = localStorage.getItem('tecnico_matricula') || "12345";
    funcaoInput.value = localStorage.getItem('tecnico_funcao') || "Técnico de Manutenção Sênior";
}

function salvarFormulario() {
    localStorage.setItem('tecnico_nome', nomeInput.value);
    localStorage.setItem('tecnico_email', emailInput.value);
    localStorage.setItem('tecnico_telefone', telefoneInput.value);

    localStorage.setItem('tecnico_matricula', matriculaInput.value);
    localStorage.setItem('tecnico_funcao', funcaoInput.value);

    localStorage.setItem('tecnico_setor', localStorage.getItem('tecnico_setor') || "Elétrica");
    localStorage.setItem('tecnico_unidade', localStorage.getItem('tecnico_unidade') || "Matriz - Vitória");


    alert('Perfil salvo com sucesso!');
    
    window.location.href = 'tecnico.html'; 
}


carregarFormulario();
if (saveButton) {
    saveButton.addEventListener('click', salvarFormulario);
}


carregarFormulario();
if (saveButton) {
    saveButton.addEventListener('click', salvarFormulario);
}
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