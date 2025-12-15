document.getElementById('toggle-sidebar').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('open');
});
function logout() {
    localStorage.removeItem('token');
    window.location.href = '../index.html'; 
}

document.getElementById('logout').addEventListener('click', logout);
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
    
    const element = document.getElementById('tecnicos');
    
    const choices = new Choices(element, {
        removeItemButton: true,
        placeholder: true,
        placeholderValue: 'Digite ou selecione um técnico...',
        searchPlaceholderValue: 'Digite para pesquisar',
        allowHTML: false,
    });

    const form = document.getElementById('solicitacao-form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const querEnviar = confirm('Deseja mesmo fazer essas alterações?');

        if (querEnviar) {
            alert('Solicitação enviada com sucesso!');
            
            form.reset(); 
            choices.clearStore();
        } else {
            
        }
    });
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

// Função para renderizar as notificações
function renderNotifications(notifications) {
    notificationListElement.innerHTML = ''; // Limpa a lista atual

    if (notifications.length === 0) {
        notificationListElement.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhuma notificação encontrada com o filtro atual.</p>';
        return;
    }

    notifications.forEach(notif => {
        const item = document.createElement('div');
        // Define a classe 'read' ou 'unread' para estilização
        const readClass = notif.isRead ? 'read' : 'unread'; 
        item.className = `notification-item ${readClass}`;

        // A estrutura HTML interna
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
        
        // Adiciona um evento de clique para simular a marcação como lida
        item.onclick = function() {
            // Se já está lida, não faz nada
            if (notif.isRead) return; 
            
            // Marca no objeto e na classe HTML
            notif.isRead = true;
            item.classList.remove('unread');
            item.classList.add('read');
            
            // Opcional: Recarrega a lista para refletir o filtro 'Não lidas'
            // O código abaixo re-executa a função de filtro ativa
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterNotifications(activeFilter);
        };
        
        notificationListElement.appendChild(item);
    });
}

// Função principal de filtragem (por aba e por pesquisa)
function filterNotifications(filterType = null) {
    let currentFilter = filterType;

    // Se o tipo de filtro não foi passado, pega o ativo (ou 'todas' por padrão)
    if (!currentFilter) {
        currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter') || 'todas';
    }

    // 1. Aplica o filtro da aba
    let filteredList = allNotifications;
    
    if (currentFilter === 'lidas') {
        filteredList = allNotifications.filter(notif => notif.isRead);
    } else if (currentFilter === 'nao-lidas') {
        filteredList = allNotifications.filter(notif => !notif.isRead);
    }
    // 'todas' já é o padrão

    // 2. Aplica o filtro de pesquisa (Search)
    const searchText = searchInput.value.toLowerCase();
    
    if (searchText) {
        filteredList = filteredList.filter(notif => 
            notif.title.toLowerCase().includes(searchText) || 
            notif.body.toLowerCase().includes(searchText)
        );
    }

    // 3. Atualiza os botões visuais
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 4. Renderiza o resultado final
    renderNotifications(filteredList);
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    filterNotifications('todas'); // Carrega a aba 'Todas' ao iniciar
});
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    if (toggleButton && sidebar) { 
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
    const nomeInput = document.getElementById('edit-nome');
    const emailInput = document.getElementById('edit-email');
    const telefoneInput = document.getElementById('edit-telefone');
    const matriculaInput = document.getElementById('edit-matricula');
    const funcaoInput = document.getElementById('edit-funcao');
    const saveButton = document.getElementById('btn-salvar');

    function carregarFormulario() {
        nomeInput.value = localStorage.getItem('encarregado_nome') || "Nome do Encarregado";
        emailInput.value = localStorage.getItem('encarregado_email') || "encarregado.nome@fortes.com.br";
        telefoneInput.value = localStorage.getItem('encarregado_telefone') || "(27) 11111-1111";
        
        matriculaInput.value = localStorage.getItem('encarregado_matricula') || "34567";
        funcaoInput.value = localStorage.getItem('encarregado_funcao') || "Encarregado de Manutenção";
    }

    function salvarFormulario() {
        localStorage.setItem('encarregado_nome', nomeInput.value);
        localStorage.setItem('encarregado_email', emailInput.value);
        localStorage.setItem('encarregado_telefone', telefoneInput.value);
        
        localStorage.setItem('encarregado_matricula', matriculaInput.value);
        localStorage.setItem('encarregado_funcao', funcaoInput.value);

        localStorage.setItem('encarregado_setor', localStorage.getItem('encarregado_setor') || "Elétrica");
        localStorage.setItem('encarregado_unidade', localStorage.getItem('encarregado_unidade') || "Matriz - Vitória");

        alert('Perfil salvo com sucesso!');
    
        window.location.href = '/Trabalho Fortes/Trabalho Fortes ENG/Encarregado/Perfil/perfil.html'; 
    }

    carregarFormulario();

    if (saveButton) {
        saveButton.addEventListener('click', salvarFormulario);
    }
});
function carregarPerfil() {
        const nomeSalvo = localStorage.getItem('encarregado_nome');
        const emailSalvo = localStorage.getItem('encarregado_email');
        const telefoneSalvo = localStorage.getItem('encarregado_telefone');
        const matriculaSalva = localStorage.getItem('encarregado_matricula');
        const funcaoSalva = localStorage.getItem('encarregado_funcao');
        const setorSalvo = localStorage.getItem('encarregado_setor');
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
        