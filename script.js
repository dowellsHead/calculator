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
                newButton.setAttribute('id', 'button/');
                newButton.textContent='/';
                break;
            case 3: 
                newButton.setAttribute('id', 'button*');
                newButton.textContent='*';
                break;
            case 2:
                newButton.setAttribute('id', 'button-');
                newButton.textContent='-';
                break;
            case 1:
                newButton.setAttribute('id', 'button+');
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
    clearButton.addEventListener('click', (event) => {
        base.textContent = '0';
    });
    deletion.appendChild(clearButton);
    const eraseButton = document.createElement('button');
    eraseButton.classList.add('content');
    eraseButton.textContent = 'erase last element';
    eraseButton.addEventListener('click', (event) =>{
        base.textContent = base.textContent.slice(0, -1);
    });
    deletion.appendChild(eraseButton);    

    container.appendChild(base);
    container.appendChild(deletion);
}

function buttonPress(){
    const display = document.querySelector('#screen');
    let symbol = document.querySelector('.container');
    symbol.addEventListener('click', (event) => {
        let targetButton = event.target;
        display.textContent = convertSignals(display.textContent, targetButton);
    })
}

function convertSignals(displayContent, target) {
    if (target.className == 'operator') {
        let prevElem = displayContent.slice(-2, -1);
        switch(prevElem){
            case '+':
            case '-':
            case '*':
            case '/':
                return displayContent;
                break;
            default:
                return displayContent + target.id.slice(-1);
        }
    }
    else if (target.id == 'dot')
        return displayContent.includes('.') ? displayContent : displayContent+'.';
    else if (target.id == 'equals')
        return 'yay'//compute(displayContent);
    else if (target.className == 'operand')
        return displayContent === '0' ? target.id.slice(-1) : displayContent+target.id.slice(-1);
            
}


createDisplay();
createNumpad();
buttonPress();