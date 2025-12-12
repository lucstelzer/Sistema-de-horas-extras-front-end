document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    const errorMessage = document.getElementById("error-message");

    const fakeDatabase = [
        {
            username: "tecnico",
            password: "123",
            role: "tecnico",
            redirectTo: "../Tecnico/index.html"
        },
        {
            username: "encarregado",
            password: "456",
            role: "encarregado",
            redirectTo: "../Encarregado/index.html"
        },
        {
            username: "gestor",
            password: "789",
            role: "gestor",
            redirectTo: "../Gestor/index.html"
        }
    ];

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        const user = fakeDatabase.find((u) => u.username === username);

        if (user) {
            if (user.password === password) {

                errorMessage.style.display = "none";
                alert(`Login como ${user.role} bem-sucedido. Redirecionando...`);
                window.location.href = user.redirectTo;

            } else {
                errorMessage.textContent = "Senha incorreta. Tente novamente.";
                errorMessage.style.display = "block";
            }
        } else {
            errorMessage.textContent = "Usuário não encontrado.";
            errorMessage.style.display = "block";
        }
    });
});