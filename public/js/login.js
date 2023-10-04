const loginFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
      try {
          const response = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify({ name, password }),
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
              document.location.replace('/');
          } else {
              alert('Failed to log in');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
