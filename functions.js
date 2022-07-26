const typeSequenceContent = document.getElementById('typeSequence');
const drawMatrixContent = document.getElementById('drawMatrix');
const postForm = document.getElementById("post-form");

document.getElementById('post-form').addEventListener('submit', async (e) =>{
    e.preventDefault();
    const hexaCode = document.getElementById('hexaCode').value;
    window.sessionStorage.setItem('hexaCode', hexaCode.toUpperCase());
    const inputType = document.getElementById('inputType').options[document.getElementById('inputType').selectedIndex].text;
    console.log(inputType);
    addNewinputType(inputType);
});

function addNewinputType(inputType){
    if(inputType == 'Type the sequence'){
        typeTheSequenceForm();
    } 
    else {
        drawTheMatrixForm();
    };
};

function typeTheSequenceForm(){ 
    window.sessionStorage.setItem('flag','decode');
    location.href = "./decodeMatrix.html";
}

function drawTheMatrixForm(){ 
    window.sessionStorage.setItem('flag','type');
    location.href = "./drawMatrix.html";
};

