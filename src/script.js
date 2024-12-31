const uploadFile = document.getElementById('uploadFile');
const consoleTextData = document.getElementById('consoleData');
const imgPreview = document.getElementById('imgPreview');
const copyOverwrite = document.getElementById('copyOverwrite');

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);

    imgPreview.src = base64;
    imgPreview.alt = "Pertinjau Gambar";

    consoleData.innerText = base64;
    consoleData.value ? document.querySelector('.image-preview').style = "display:block" : null;
};

function copyToClipboard() {
    if (consoleData.value) {
        consoleData.select();
        document.execCommand('copy');

        copyOverwrite.innerText = "Berhasil disalin";
    }
}

uploadFile.addEventListener('change', (e) => {
    uploadImage(e);
});

uploadFile.addEventListener('dragover', (e) => {
    e.preventDefault();
},false);

uploadFile.addEventListener('dragenter', () => {
    uploadFile.classList.add('active');
});

uploadFile.addEventListener('dragleave', () => {
    uploadFile.classList.remove('active');
});

uploadFile.addEventListener('drop', (e) => {
    e.preventDefault();

    uploadFile.classList.remove('active');
    uploadImage(e);
});
