document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error');
  
    try {
      const response = await fetch('data/users.csv');
      if (!response.ok) {
        throw new Error('Failed to load users.csv');
      }
  
      const csvText = await response.text();
      const users = csvText.split('\n').slice(1); // Skip header
  
      let matchFound = false;
  
      for (const line of users) {
        const [user, pass, role, id] = line.trim().split(',');
        if (user?.trim() === usernameInput && pass?.trim() === passwordInput) {
          matchFound = true;
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('username', usernameInput);
          localStorage.setItem('role', role?.trim());
          localStorage.setItem('id', id?.trim());
  
          const destination = role?.trim() === 'doctor' ? 'patients.html' : 'patient.html';
  
          const loginContainer = document.querySelector('.login-container');
          loginContainer.innerHTML = `
            <div style="text-align:center;">
              <p>Logging in, please wait...</p>
              <img src="img/logo.png" alt="Loading" style="height:80px; animation:spin 2s linear infinite;" />
            </div>
          `;
  
          setTimeout(() => {
            window.location.href = destination;
          }, 2000);
  
          break;
        }
      }
  
      if (!matchFound) {
        errorMsg.textContent = 'Invalid username or password';
      }
    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'Error loading user data';
    }
  });
  
  // Spinner animation
  const style = document.createElement('style');
  style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
  document.head.appendChild(style);
  
  // Handle Logout and Navbar Role Display
  window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedIn')) {
      const navLinks = document.querySelectorAll('.nav-links li a');
      navLinks.forEach(link => {
        if (link.getAttribute('href') === 'login.html') {
          link.textContent = 'Logout';
          link.href = '#';
          link.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'login.html';
          });
        }
      });
  
      const role = localStorage.getItem('role');
      if (role === 'doctor') {
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'none');
      } else if (role === 'patient') {
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'none');
  
        // Dynamically add Patient tab
        const nav = document.querySelector('.nav-links');
        const patientTab = document.createElement('li');
        patientTab.className = 'patient-only';
        patientTab.innerHTML = '<a href="patient.html">Patient</a>';
        nav.appendChild(patientTab);
      }
    }
  });