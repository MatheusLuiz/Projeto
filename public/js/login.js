const form = document.getElementById('login-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        window.location.href = 'dashboard.html';
      } else {
        const responseData = await response.json();
        const errorMessageDiv = document.getElementById('error-message');
        errorMessageDiv.innerHTML = `<p>${responseData.message}</p>`;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      const errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.innerHTML = `<p>Erro interno no servidor. Tente novamente mais tarde.</p>`;
    }
    setTimeout(function() {
        window.location.href = "/"; 
    }, 2000);
  });