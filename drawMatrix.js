class Matrix{
    #numberRows;
    #numberColumns;
    #sequence;
    #submitButton;
    #matrixContainer;
    #receivingContainer;
    #uploadMatrixButton;
    #sequenceToSend;
    #hexaCode;

    constructor(rxSequence){
        this.#numberRows;
        this.#numberColumns;
        this.#sequence = [];
        this.#hexaCode = sessionStorage.getItem('hexaCode');

        if(rxSequence){
            this.#receivingContainer;
            console.log('something');
            this.#decodeMatrix(rxSequence);
        } else{
            this.#submitButton = document.querySelector('.content');
            this.#matrixContainer = document.querySelector('.drawMatrix');
            this.#matrixContainer.addEventListener('click', this.#onCardSelected.bind(this));
            this.#submitButton.addEventListener('click', this.#showTheMatrix.bind(this));
            this.#uploadMatrixButton;
            this.#sequenceToSend = '';
        
        }
    };

    #checkForSizeInput(){
        let rowSize = document.getElementById('matrixRows').value;
        let columnSize = document.getElementById('matrixColumns').value;

        if(rowSize && columnSize){
            this.#numberColumns = columnSize;
            this.#numberRows = rowSize;
            return true
        } else {
            window.alert('Must digit the full size');
            return false;
        }

    };

    #showTheMatrix(event){
        let target = event.target;
        if(target.tagName == 'BUTTON'){
            if(this.#checkForSizeInput()){
                this.#matrixContainer.style["grid-template-columns"] = `repeat(${this.#numberColumns},${this.#numberRows}fr)`;
                this.#sequence = [];
                let matrixContainerContent = ``;

                for(let i = 0; i<this.#numberRows; i++){
                    let rowSequence = [];
                    for(let n = 0; n<this.#numberColumns; n++){
                        matrixContainerContent += `
                            <span id="card-${i}-${n}" class="card hidden-card style="width: ${1800/this.#numberColumns}px; height: ${2000/this.#numberRows}px"> 
                            </span>
                        `;

                        rowSequence.push(0);
                    };
                    this.#sequence.push(rowSequence);
                };
                matrixContainerContent += `<button id="submitMatrixButton" style="margin-top: 20px; width: 100%;">Upload Matrix</button>`;
                this.#matrixContainer.innerHTML = matrixContainerContent;
                this.#uploadMatrixButton = document.getElementById('submitMatrixButton');
                this.#uploadMatrixButton.addEventListener('click',this.#generateSequence.bind(this));
            };
        };
    };

    #showDecodeMatrix(){
        this.#receivingContainer.style["grid-template-columns"] = `repeat(${this.#numberColumns},${this.#numberRows}fr)`;
        let matrixContainerContent = ``;

        for(let i = 0; i<this.#numberRows; i++){
            for(let n = 0; n<this.#numberColumns; n++){
                matrixContainerContent += `
                    <span id="card-${i}-${n}" class="card hidden-card style="width: ${1800/this.#numberColumns}px; height: ${2000/this.#numberRows}px"> 
                    </span>
                `;

            };
        };
        this.#receivingContainer.innerHTML = matrixContainerContent;

        for(let i = 0; i<this.#numberRows ; i++) {
            for(let n = 0; n<this.#numberColumns ; n++) {
                const position = this.#sequence[i][n]
                if(parseInt(position)){
                    console.log()
                    const card = document.getElementById(`card-${i}-${n}`);
                    card.classList.remove("hidden-card");

                };
            };
        };
    };

    #generateSequence(){
        this.#sequenceToSend = '';
        this.#sequence.forEach(row =>{
            row.forEach(position => {
                this.#sequenceToSend += position;
            });
            this.#sequenceToSend += 'N';
        });
        this.#sequenceToSend = this.#sequenceToSend.slice(0, -1);
        this.#sequenceToSend += 'X';

        let infoToSendContent = ``;
        let infoToSendContainer = document.getElementById('showInfo');
        infoToSendContent = `<h1>The sequence to be send is</h1>
                            <p> ${this.#hexaCode}${this.#sequenceToSend}<p>
                            `;
        infoToSendContainer.innerHTML = infoToSendContent;
        console.log(this.#sequenceToSend);
    };

    #onCardSelected(event){
        let target = event.target;
        if(target.tagName == 'SPAN'){
            let position = target.id.split('-')[1] + '-' + target.id.split('-')[2];
            let xPosition = position.split('-')[0];
            let yPosition = position.split('-')[1];
            let cardSelected = document.getElementById(`card-${position}`);
            cardSelected.style.backgroundColor = "red";
            this.#sequence[xPosition][yPosition] = 1;
        }
    };

    #decodeMatrix(rxSequence){
        this.#receivingContainer = document.getElementsByClassName('decodeMatrix')[0];
        console.log(this.#receivingContainer);
        let matrixSequence = [];
        let matrixRow = [];
        this.#sequence = [];
        Array.from(rxSequence).forEach(position => {
            if(position == 'N' || position == 'X'){
                if(position == 'X'){
                    this.#numberColumns = matrixRow.length;
                }
                matrixSequence.push(matrixRow);
                matrixRow = [];
            }
            else{
                matrixRow.push(position);
            }
        });
        this.#numberRows = matrixSequence.length;
        this.#sequence = matrixSequence;
        this.#showDecodeMatrix();
    };



}


window.onload = function(){
    let flag = window.sessionStorage.getItem('flag');
    let hexaCode = sessionStorage.getItem('hexaCode');
    console.log(hexaCode);
    if(flag == 'decode'){
        const decodeMatrix = document.getElementById('typeInputs');
        decodeMatrix.addEventListener('click',checkForInputsToDecode);
        
    } else {
        console.log(flag);
        let matrix = new Matrix();
    };
};

const checkForInputsToDecode = function(){
    let hexaContent = document.getElementById('hexaCodeToDecode').value;
    let matrixContent = document.getElementById('matrixCodeToDecode').value;

    if(matrixContent && hexaContent){
        var matrix = new Matrix(matrixContent);
    } else{
        window.alert('Must digit all the fields');
    }
}



