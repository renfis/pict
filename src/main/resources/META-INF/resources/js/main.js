const inputField = document.getElementById('pict-input');
const outputField = document.getElementById('pict-output');

const initialText = 'Bla Bla Bla...'
inputField.value = initialText;
outputField.value = '';

function clearInitialText() {
    if (inputField.value === initialText) {
        inputField.value = '';
    }
}

function processPict() {
    if (inputField.value === initialText || inputField.value === '') {
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'pict', true);
    xhttp.setRequestHeader('Content-Type', 'text/plain');
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            outputField.value = this.status === 200
                ? this.responseText
                : "HTTP STATUS " + this.status + ": " + this.responseText;
        }
    };
    xhttp.send(inputField.value);
}

function selectAll() {
    outputField.select();
}
