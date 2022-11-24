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

function initWindow(name) {
    const startBarItemId = name + '-item';
    const minButtonId = name + '-min-button';
    const closeButtonId = name + '-close-button';
    const windowId = name + '-window';

    document.getElementById(startBarItemId).addEventListener('click', () => {
        const classList = document.getElementById(windowId).classList;
        if (classList.contains('hidden')) {
            classList.remove('hidden');
        } else {
            classList.add('hidden');
        }
    });

    [minButtonId, closeButtonId].forEach(elem => {
        document.getElementById(elem).addEventListener('click', () => {
            document.getElementById(windowId).classList.add('hidden');
        });
    });
}

['imprint', 'pict', 'privacy-terms'].forEach(name => initWindow(name));
