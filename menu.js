document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('nomeUsuario');
    const saveButton = document.getElementById('botaoInicial');
    const loadButton = document.getElementById('loadButton');
    const output = document.getElementById('output');

    // Save the input value to local storage
    saveButton.addEventListener('click', () => {
        const inputValue = inputField.value;
        localStorage.setItem('botaoInicial', inputValue);
        alert('Viajante Registrado!.');
    });

    // Load the input value from local storage
    loadButton.addEventListener('click', () => {
        const savedInput = localStorage.getItem('botaoInicial');
        if (savedInput) {
            output.textContent = `Saved value: ${savedInput}`;
        } else {
            output.textContent = 'No value saved in local storage.';
        }
    });

    // Optional: Load the saved value into the input field on page load
    const savedInput = localStorage.getItem('botaoInicial');
    if (savedInput) {
        inputField.value = savedInput;
    }
});





