const inputField = document.getElementById('pict-input');
const outputField = document.getElementById('pict-output');
const progressStatusParagraph = document.getElementById('progress-status');
const testAmountParagraph = document.getElementById('test-amount');

const initialText = 'Bla Bla Bla...';
inputField.value = initialText;
outputField.value = '';
progressStatusParagraph.textContent = 'Ready.';
progressStatusParagraph.textContent = 'Test cases: 0';

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
            if (this.status === 200) {
                const linesWithoutHeadline = (this.responseText.match(/\n/g) || '').length;
                testAmountParagraph.textContent = "Test cases: " + linesWithoutHeadline;
                outputField.value = this.responseText;
            } else {
                testAmountParagraph.textContent = "Error " + this.status;
                outputField.value = "HTTP STATUS " + this.status + ": " + this.responseText;
            }
            progressStatusParagraph.textContent = 'Ready.';
        }
    };
    xhttp.send(inputField.value);
}

function selectAll() {
    outputField.select();
}
