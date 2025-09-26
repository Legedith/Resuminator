document.addEventListener('DOMContentLoaded', () => {
    const configBtn = document.getElementById('config-btn');
    const apiKeyInput = document.getElementById('api-key');
    const modelInput = document.getElementById('model');
    const uploadBtn = document.getElementById('upload-btn');
    const resumeFileInput = document.getElementById('resume-file');
    const mainApp = document.getElementById('main-app');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const previewBtn = document.getElementById('preview-btn');
    const codeBtn = document.getElementById('code-btn');
    const pdfPreview = document.getElementById('pdf-preview');
    const codeView = document.getElementById('code-view');
    const downloadBtn = document.getElementById('download-btn');

    let currentFilename = '';
    let currentLatexCode = '';

    configBtn.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value;
        const model = modelInput.value;

        if (!apiKey) {
            alert('Please enter your OpenAI API Key.');
            return;
        }

        const response = await fetch('/configure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ api_key: apiKey, model: model || 'gpt-4' })
        });

        if (response.ok) {
            alert('Configuration saved successfully.');
        } else {
            alert('Failed to save configuration.');
        }
    });

    uploadBtn.addEventListener('click', async () => {
        const file = resumeFileInput.files[0];
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                currentFilename = result.filename;
                currentLatexCode = result.latex_code;
                codeView.value = currentLatexCode;
                document.getElementById('upload-section').classList.add('hidden');
                document.getElementById('config-section').classList.add('hidden');
                mainApp.classList.remove('hidden');
                updatePreview();
            } else {
                alert(`Error: ${result.detail}`);
            }
        } catch (error) {
            alert('An error occurred during file upload.');
            console.error(error);
        }
    });

    sendBtn.addEventListener('click', async () => {
        const message = chatInput.value;
        if (!message || !currentFilename) {
            return;
        }

        appendMessage('user', message);
        chatInput.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message, filename: currentFilename })
            });

            const result = await response.json();

            if(response.ok) {
                appendMessage('assistant', result.response);
                currentLatexCode = result.latex_code;
                codeView.value = currentLatexCode;
                updatePreview();
            } else {
                 appendMessage('assistant', `Error: ${result.detail}`);
            }

        } catch (error) {
             appendMessage('assistant', 'An error occurred.');
             console.error(error);
        }
    });

    codeView.addEventListener('change', async (e) => {
        const newCode = e.target.value;
        if (newCode !== currentLatexCode) {
            try {
                const response = await fetch(`/save/${currentFilename}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: newCode })
                });
                const result = await response.json();
                if (response.ok) {
                    currentLatexCode = newCode;
                    updatePreview();
                } else {
                    alert(`Error saving file: ${result.detail}`);
                }
            } catch (error) {
                alert('An error occurred while saving the file.');
                console.error(error);
            }
        }
    });

    async function updatePreview() {
        if (!currentFilename) return;

        try {
            const response = await fetch('/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: currentFilename, content: codeView.value })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                pdfPreview.src = url;
            } else {
                const error = await response.json();
                console.error('PDF Compilation Error:', error.details);
                alert(`PDF Compilation Failed:\n${error.details}`);
            }
        } catch (error) {
            alert('An error occurred while compiling the PDF.');
            console.error(error);
        }
    }

    downloadBtn.addEventListener('click', () => {
        if (!currentFilename) return;
        const pdfUrl = pdfPreview.src;
        if (pdfUrl) {
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = currentFilename.replace('.tex', '.pdf');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('No PDF to download. Please compile first.');
        }
    });

    previewBtn.addEventListener('click', () => {
        pdfPreview.parentElement.classList.remove('hidden');
        codeView.classList.add('hidden');
        previewBtn.classList.add('active');
        codeBtn.classList.remove('active');
    });

    codeBtn.addEventListener('click', () => {
        pdfPreview.parentElement.classList.add('hidden');
        codeView.classList.remove('hidden');
        previewBtn.classList.remove('active');
        codeBtn.classList.add('active');
    });

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.innerText = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});