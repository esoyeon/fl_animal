document.addEventListener('DOMContentLoaded', () => {
    const animalSelector = document.querySelector('.animal-selector');
    const animalImage = document.getElementById('animal-image');

    animalSelector.addEventListener('change', (event) => {
        const selectedAnimal = event.target.value;
        if (selectedAnimal) {
            animalImage.innerHTML = `<img src="/static/images/${selectedAnimal}_image.png" alt="${selectedAnimal}">`;
        }
    });
});

function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const fileInfo = document.getElementById('file-info');

    if (!file) {
        fileInfo.textContent = 'Please select a file.';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                fileInfo.textContent = data.error;
            } else {
                fileInfo.innerHTML = `
                <p>File Name: ${data.name}</p>
                <p>File Size: ${data.size} bytes</p>
                <p>File Type: ${data.type}</p>
            `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            fileInfo.textContent = 'An error occurred while uploading the file.';
        });
}
