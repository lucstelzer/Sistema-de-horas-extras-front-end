document.getElementById('toggle-sidebar').addEventListener('click', function () {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
});
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role'); // Adicionado para limpar o papel do usuário
    // CORREÇÃO: Usa caminho relativo para a raiz, onde está o index.html de login.
    window.location.href = '../index.html'; 
}

document.getElementById('logout').addEventListener('click', logout);

// Define a função showpage no escopo global para que possa ser chamada por onclick
function showpage(pageName) {
    const pages = document.querySelectorAll('.page');
    const sidebar = document.querySelector('.sidebar');

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

function darkModeToggle() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

// === Funções de Perfil (Definidas globalmente para organização) ===

// Função de carregamento do formulário de edição
function carregarFormulario() {
    const nomeInput = document.getElementById('edit-nome');
    const emailInput = document.getElementById('edit-email');
    const telefoneInput = document.getElementById('edit-telefone');
    const matriculaInput = document.getElementById('edit-matricula');
    const funcaoInput = document.getElementById('edit-funcao');

    if (nomeInput) nomeInput.value = localStorage.getItem('encarregado_nome') || "Nome do Encarregado";
    if (emailInput) emailInput.value = localStorage.getItem('encarregado_email') || "encarregado.nome@fortes.com.br";
    if (telefoneInput) telefoneInput.value = localStorage.getItem('encarregado_telefone') || "(27) 11111-1111";
    
    if (matriculaInput) matriculaInput.value = localStorage.getItem('encarregado_matricula') || "34567";
    if (funcaoInput) funcaoInput.value = localStorage.getItem('encarregado_funcao') || "Encarregado de Manutenção";
}

// Função de salvamento do formulário de edição
function salvarFormulario() {
    const nomeInput = document.getElementById('edit-nome');
    const emailInput = document.getElementById('edit-email');
    const telefoneInput = document.getElementById('edit-telefone');
    const matriculaInput = document.getElementById('edit-matricula');
    const funcaoInput = document.getElementById('edit-funcao');

    localStorage.setItem('encarregado_nome', nomeInput.value);
    localStorage.setItem('encarregado_email', emailInput.value);
    localStorage.setItem('encarregado_telefone', telefoneInput.value);
    
    localStorage.setItem('encarregado_matricula', matriculaInput.value);
    localStorage.setItem('encarregado_funcao', funcaoInput.value);

    localStorage.setItem('encarregado_setor', localStorage.getItem('encarregado_setor') || "Elétrica");
    localStorage.setItem('encarregado_unidade', localStorage.getItem('encarregado_unidade') || "Matriz - Vitória");

    alert('Perfil salvo com sucesso!');
    showpage('perfil'); 
}

// Função de carregamento da tela de perfil
function carregarPerfil() {
    const nomeSalvo = localStorage.getItem('encarregado_nome');
    const emailSalvo = localStorage.getItem('encarregado_email');
    const telefoneSalvo = localStorage.getItem('encarregado_telefone');
    const matriculaSalva = localStorage.getItem('encarregado_matricula');
    const funcaoSalva = localStorage.getItem('encarregado_funcao');
    const setorSalvo = localStorage.getItem('encarregado_setor');
    const unidadeSalva = localStorage.getItem('tecnico_unidade');

    if (nomeSalvo) {
        const el = document.getElementById('profile-name');
        if (el) el.textContent = nomeSalvo;
    }
    if (emailSalvo) {
        const el = document.getElementById('profile-email');
        if (el) el.textContent = emailSalvo;
    }
    if (telefoneSalvo) {
        const el = document.getElementById('profile-telefone');
        if (el) el.textContent = telefoneSalvo;
    }
    if (matriculaSalva) {
        const el = document.getElementById('profile-matricula');
        if (el) el.textContent = matriculaSalva;
    }
    if (funcaoSalva) {
        const el = document.getElementById('profile-funcao');
        if (el) el.textContent = funcaoSalva;
    }
    if (setorSalvo) {
        const el = document.getElementById('profile-setor');
        if (el) el.textContent = setorSalvo;
    }
    if (unidadeSalva) {
        const el = document.getElementById('profile-unidade');
        if (el) el.textContent = unidadeSalva;
    }
}


// === Lógica principal (DOMContentLoaded) ===

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do tema escuro
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Lógica do formulário de solicitação (Choices.js)
    const element = document.getElementById('tecnicos');
    if (typeof Choices !== 'undefined' && element) {
         // O Choices precisa ser definido no HTML ou importado
        const choices = new Choices(element, {
            removeItemButton: true,
            placeholder: true,
            placeholderValue: 'Digite ou selecione um técnico...',
            searchPlaceholderValue: 'Digite para pesquisar',
            allowHTML: false,
        });

        const form = document.getElementById('solicitacao-form');
        
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const querEnviar = confirm('Deseja mesmo fazer essas alterações?');

                if (querEnviar) {
                    alert('Solicitação enviada com sucesso!');
                    
                    form.reset(); 
                    choices.clearStore();
                }
            });
        }
    }


    // Lógica de Notificações
    const notificationListElement = document.getElementById('notificationList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    // Mantenho a função interna aqui para evitar duplicação ou conflito no escopo
    const allNotifications = [
        { title: "Notificação sobre hora extra", body: "Sua solicitação #234 foi aprovado", date: "10:30", isRead: false },
        { title: "Notificação sobre folga no próximo feriado", body: "Sua solicitação #234 foi aprovado", date: "29/03", isRead: false },
        { title: "Notificação sobre hora extra", body: "Você foi chamado para participar de uma hora extra", date: "16/01", isRead: true },
        { title: "Alerta de sistema", body: "O servidor 01 será reiniciado em 5 minutos", date: "Ontem", isRead: false },
        { title: "Nova mensagem", body: "Você tem 3 novas mensagens na caixa de entrada", date: "15/12", isRead: true }
    ];

    function renderNotifications(notifications) {
        if (!notificationListElement) return;
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
            
            item.onclick = function() {
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

    // Função principal de filtragem de notificações
    function filterNotifications(filterType = null) {
        let currentFilter = filterType;

        if (!currentFilter) {
            const activeBtn = document.querySelector('.filter-btn.active');
            currentFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'todas';
        }

        let filteredList = allNotifications;
        
        if (currentFilter === 'lidas') {
            filteredList = allNotifications.filter(notif => notif.isRead);
        } else if (currentFilter === 'nao-lidas') {
            filteredList = allNotifications.filter(notif => !notif.isRead);
        }

        const searchText = searchInput ? searchInput.value.toLowerCase() : '';
        
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
    
    // Inicializa a página com notificações e perfil
    filterNotifications('todas');
    carregarPerfil(); 
    carregarFormulario();
    
    // Associa o botão de salvar à função corrigida
    const saveButton = document.getElementById('btn-salvar');
    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
});

// Lógica de FAQ (perguntas frequentes)
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