function createNumpad() {
    const main = document.querySelector('.container')
    let buttonSize = 500;
    const numbersSide = document.createElement('div');
    for (let j=12; j>0; j--){
        const newButton = document.createElement('button');
        newButton.style.width = buttonSize+"px";
        newButton.style.height = buttonSize+"px";
        newButton.setAttribute('class', 'numpad');
        switch (j){
            case 1:
                newButton.setAttribute('id', 'equals');
                newButton.classList.add('content');
                newButton.textContent = '=';
                break;
              case 2:
                newButton.setAttribute('id', 'dot');
                newButton.classList.add('content');
                newButton.textContent = '.';
                break;
            default:         
                newButton.setAttribute('id', 'button'+(j-3));
                newButton.classList.add('content');
                newButton.textContent = j-3;
                break;
        }
        numbersSide.appendChild(newButton);
    
    }
    const operandsSide = document.createElement('div');
    for (let i=4;i>0;i--){
        const newButton = document.createElement('button');
        newButton.style.width = buttonSize+"px";
        newButton.style.height = buttonSize+"px";
        newButton.setAttribute('class', 'numpad');
        switch (i){
            case 4:
                newButton.setAttribute('id', 'divide');
                newButton.classList.add('content');
                newButton.textContent='/';
                break;
            case 3: 
                newButton.setAttribute('id', 'multiply');
                newButton.classList.add('content');
                newButton.textContent='*';
            case 2:
                newButton.setAttribute('id', 'subtract');
                newButton.classList.add('content');
                newButton.textContent='-';
            case 1:
                newButton.setAttribute('id', 'add');
                newButton.classList.add('content');
                newButton.textContent='+';
        }
        operandsSide.appendChild(newButton);
    }

    main.appendChild(numbersSide);
    main.appendChild(operandsSide);
}



createNumpad();