document.addEventListener('DOMContentLoaded', function() {
    let commands = {};

    // Load commands from JSON file
    fetch('os/packs/x32/commands.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            commands = data;
            console.log('Commands loaded:', commands);  // Debug: Log the loaded commands
        })
        .catch(error => {
            console.error('Error loading commands:', error);
            const outputDiv = document.getElementById('output');
            const errorLine = document.createElement('div');
            errorLine.textContent = 'Error loading commands: ' + error.message;
            outputDiv.appendChild(errorLine);
        });

    const input = document.getElementById('userCmd');
    const outputDiv = document.getElementById('output');

    input.addEventListener('keydown', function(event) {
        console.log('Key pressed:', event.key);  // Debug: Log the pressed key
        if (event.key === 'Enter') {
            const value = input.value.trim();
            console.log('Input value:', value);  // Debug: Log the input value

            if (value) {
                const newLine = document.createElement('div');
                newLine.textContent = '> ' + value;
                outputDiv.appendChild(newLine);

                const responseLine = document.createElement('div');
                if (commands[value]) {
                    if (value === 'date') {
                        responseLine.textContent = 'The current date is: ' + new Date().toLocaleString();
                    } else {
                        responseLine.textContent = commands[value];
                    }
                } else {
                    responseLine.textContent = 'Unknown command: ' + value;
                }
                outputDiv.appendChild(responseLine);

                // Scroll to the bottom of the output
                outputDiv.scrollTop = outputDiv.scrollHeight;

                // Clear the input
                input.value = '';
            }
        }
    });
});
