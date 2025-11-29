// Load system information on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSystemInfo();
});

// Load system information from API
async function loadSystemInfo() {
    const infoDiv = document.getElementById('systemInfo');
    try {
        const response = await fetch('/api/info');
        const data = await response.json();
        
        infoDiv.innerHTML = `
            <p><strong>Application:</strong> ${data.app}</p>
            <p><strong>Version:</strong> ${data.version}</p>
            <p><strong>Environment:</strong> ${data.environment}</p>
            <p><strong>Node.js Version:</strong> ${data.node_version}</p>
            <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        `;
    } catch (error) {
        infoDiv.innerHTML = `<p style="color: #e53e3e;">Error loading system information: ${error.message}</p>`;
    }
}

// Test the info API
async function testInfoAPI() {
    try {
        const response = await fetch('/api/info');
        const data = await response.json();
        alert('API Response:\n\n' + JSON.stringify(data, null, 2));
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Test the greet API
async function testGreetAPI() {
    const name = prompt('Enter a name:', 'Azure');
    if (name) {
        try {
            const response = await fetch(`/api/greet/${encodeURIComponent(name)}`);
            const data = await response.json();
            alert('API Response:\n\n' + JSON.stringify(data, null, 2));
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Test the echo API
async function testEchoAPI() {
    const message = prompt('Enter a message to echo:', 'Hello Azure!');
    if (message) {
        try {
            const response = await fetch('/api/echo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            alert('API Response:\n\n' + JSON.stringify(data, null, 2));
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Greet user function
async function greetUser() {
    const nameInput = document.getElementById('nameInput');
    const resultDiv = document.getElementById('result');
    const name = nameInput.value.trim() || 'World';
    
    try {
        const response = await fetch(`/api/greet/${encodeURIComponent(name)}`);
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <h3 style="color: #667eea; margin-bottom: 10px;">Response:</h3>
            <p style="font-size: 1.2rem; margin-bottom: 10px;">${data.message}</p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        resultDiv.classList.add('show');
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: #e53e3e;">Error: ${error.message}</p>`;
        resultDiv.classList.add('show');
    }
}

// Allow pressing Enter in the name input
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                greetUser();
            }
        });
    }
});
