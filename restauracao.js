document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('requestForm');
    const usernameInput = document.getElementById('username');
    const messageElement = document.getElementById('message');
    const submitButton = requestForm.querySelector('button[type="submit"]');

    const mockUserDatabase = ["tecnico", "encarregado", "gestor"];

    function mockCheckUser(username) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (mockUserDatabase.includes(username)) {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: "Cadastro não encontrado." });
                }
            }, 1000); 
        });
    }

    requestForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const username = usernameInput.value;

        submitButton.disabled = true;
        submitButton.textContent = 'Verificando...';
        messageElement.textContent = 'Procurando cadastro no sistema...';
        messageElement.className = ''; 
        const result = await mockCheckUser(username);

        if (result.success) {
            messageElement.textContent = `Usuário '${username}' encontrado! (Simulação) Redirecionando para a redefinição de senha...`;
            messageElement.className = 'success'; 

            setTimeout(() => {
                window.location.href = 'restauracao.html?token=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
            }, 3000);

        } else {
            messageElement.textContent = `Erro: ${result.message}`;
            messageElement.className = 'error'; 
            submitButton.disabled = false;
            submitButton.textContent = 'Solicitar Link';
        }
    });
});