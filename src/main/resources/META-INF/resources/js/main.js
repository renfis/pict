const inputField = document.getElementById('pict-input');
const outputField = document.getElementById('pict-output');
const progressStatusParagraph = document.getElementById('progress-status');

const initialText = 'Bla Bla Bla...';
inputField.value = initialText;
outputField.value = '';
progressStatusParagraph.textContent = 'Ready.';

function clearInitialText() {
    if (inputField.value === initialText) {
        inputField.value = '';
    }
}

function processPict() {
    if (inputField.value === initialText || inputField.value === '') {
        return;
    }

    progressStatusParagraph.textContent = 'Processing …';
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'pict', true);
    xhttp.setRequestHeader('Content-Type', 'text/plain');
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            outputField.value = this.status === 200
                ? this.responseText
                : "HTTP STATUS " + this.status + ": " + this.responseText;
            progressStatusParagraph.textContent = 'Ready.';
        }
    };
    xhttp.send(inputField.value);
}

function selectAll() {
    outputField.select();
}
