function addNumbers(a, b){
    return a+b;
}

function subtractNumbers(a, b){
    return a-b;
}

function multiplyNumbers(a, b){
    return a*b;
}

function divideNumbers(a, b){
    return b == 0 ? 'begone ye, lest ye divide by zeroeth' : a/b;
}

function createNumpad() {
    const main = document.querySelector('.container')
    let buttonSize = 500/4;
    const numbersSide = document.createElement('div');
    for (let j=12; j>0; j--){
        const newButton = document.createElement('button');
        newButton.style.width = buttonSize+"px";
        newButton.style.height = buttonSize+"px";
        newButton.style.margin = '2px';
        newButton.classList.add('content');
        switch (j){
            case 1:
                newButton.setAttribute('id', 'equals');
                newButton.textContent = '=';
                break;
              case 2:
                newButton.setAttribute('id', 'dot');
                newButton.textContent = '.';
                break;
            default:         
                newButton.setAttribute('id', 'button'+(j-3));
                newButton.setAttribute('class', 'operand');
                newButton.textContent = j-3;
                break;
        }
        numbersSide.appendChild(newButton);
    
    }
    const operatorsSide = document.createElement('div');
    for (let i=4;i>0;i--){
        const newButton = document.createElement('button');
        newButton.style.width = buttonSize+"px";
        newButton.style.height = buttonSize+"px";
        newButton.style.margin = '2px';
        newButton.classList.add('content');
        newButton.setAttribute('class', 'operator');
        switch (i){
            case 4:
                newButton.setAttribute('id', 'divide');
                newButton.textContent='/';
                break;
            case 3: 
                newButton.setAttribute('id', 'multiply');
                newButton.textContent='*';
                break;
            case 2:
                newButton.setAttribute('id', 'subtract');
                newButton.textContent='-';
                break;
            case 1:
                newButton.setAttribute('id', 'add');
                newButton.textContent='+';
                break;
        }
        operatorsSide.appendChild(newButton);
    }

    main.appendChild(numbersSide);
    main.appendChild(operatorsSide);
    
}

function createDisplay() {
    const container = document.querySelector('.display');
    const base = document.createElement('div');
    base.setAttribute('id', 'screen');
    base.style.height = '150px';
    base.style.flexGrow = '1';
    base.style.border = '1px solid black';
    base.classList.add('content');
    base.textContent = '0';
    
    const deletion = document.createElement('div');
    deletion.style.display = 'flex';
    deletion.style.flexDirection = 'column';
    deletion.style.justifyContent = 'center';
    const clearButton = document.createElement('button');
    clearButton.classList.add('content');
    clearButton.textContent = 'clear all';
    clearButton.setAttribute('id', 'clear');
    clearButton.addEventListener('click', (event) => {
        base.textContent = '0';
    });
    deletion.appendChild(clearButton);
    const eraseButton = document.createElement('button');
    eraseButton.classList.add('content');
    eraseButton.textContent = 'erase last element';
    eraseButton.setAttribute('id', 'erase');
    eraseButton.addEventListener('click', (event) =>{
        base.textContent = base.textContent.slice(0, -1);
    });
    deletion.appendChild(eraseButton);    

    const signButton = document.createElement('button');
    signButton.classList.add('content');
    signButton.textContent = '+/-';
    signButton.setAttribute('id', 'changeSign');
    signButton.addEventListener('click', (event) => {
        base.textContent = base.textContent.slice(0,1) == '-' ? base.textContent.slice(1) : '-' + base.textContent;
    });
    deletion.appendChild(signButton);

    container.appendChild(base);
    container.appendChild(deletion);
}

function buttonPress(){
    const display = document.querySelector('#screen');
    let displayBuffer = {
        operand : 0, 
        operator: 0, 
        flag : 0
    };
    const clearBuffer = document.querySelector('#clear');
    clearBuffer.addEventListener('click', (e) => {
        displayBuffer = {
            operand : 0, 
            operator: 0, 
            flag: 0,
        };
        display.textContent = '0';
    });
    
    let symbol = document.querySelector('.container');
    symbol.addEventListener('click', (event) => {
        let targetButton = event.target;
        display.textContent = convertSignals(display.textContent, targetButton, displayBuffer);
    });
}

function convertSignals(displayContent, target, buffer) {
    if (target.className == 'operand'){
        if (displayContent === '0' || buffer.flag != 0 ) {
            buffer.flag = 0;
            return target.id.slice(-1); 
        } else {
            return displayContent+target.id.slice(-1);
        }
    }
    else if (target.id == 'dot'){
        console.log('fire', displayContent);
        return displayContent % 1 === 0 ? displayContent+'.' : displayContent;
    }
    else if (target.className == 'operator'){
        if (buffer.operator == 0){
            buffer.operand = displayContent;
        } else {
            buffer.operand = operate(Number(buffer.operand), Number(displayContent), buffer.operator);
        }
        buffer.operator = target.id;
        buffer.flag = 1;
        return displayContent;
    } else if (target.id == 'equals'){
        if (buffer.operator != 0 && buffer.flag !== 1){
            displayContent = operate(Number(buffer.operand), Number(displayContent), buffer.operator);
            buffer.flag = 1;
            buffer.operand = 0;
            buffer.operator = 0;
            return Math.round(displayContent*100)/100;
        } else {
            buffer.flag = 1;
            return 'ERROR';
        }
    }
            
}

function operate(operandA, operandB, operator){
    switch (operator){
        case 'add':
            return addNumbers(operandA, operandB);
            break;
        case 'subtract':
            return subtractNumbers(operandA, operandB);
            break;
        case 'multiply':
            return multiplyNumbers(operandA, operandB);
            break;
        case 'divide':
            return divideNumbers(operandA, operandB);
            break;
    }        
}

createDisplay();
createNumpad();
buttonPress();