// MATHEMATICAL FUNCTIONS

function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

// OPERATION FUNCTION TAKES THE SUM AND CALLS THE CORRECT FUNCTION

function operate(x,operator,y){
    console.log(`recieved ${x}, ${operator} and ${y}`)
    let a = Number(x);
    let b = Number(y);
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default:
            return 'OOPS';
    }
}

const inputs = document.getElementsByClassName("input");
const dispBot = document.querySelector('#botDisplay');
const dispTop = document.querySelector('#topDisplay');
const equals = document.querySelector('#equals')
const clear = document.querySelector('#clear');

Array.from(inputs).forEach(function(input){
    input.addEventListener('click', function(){
        dispBot.textContent += this.textContent;
    })
})

clear.addEventListener('click', function(){
    dispBot.textContent = '';
    dispTop.textContent = '';
})

equals.addEventListener('click', function(){
    let elements = dispBot.textContent.split(' ')
    //while(elements.length > 1){
        let opInd = 0;
        if(elements.includes('x'||'÷')){
            console.log("contains operator")
            let opInd = elements.indexOf('x'||'÷')
            elements[opInd] = operate(elements[opInd-1],elements[opInd], elements[opInd+1])
            elements.splice(opInd-1,1);
            elements.splice(opInd,1);
      //      continue;
        }
    //}
    //console.log(elements)

    dispTop.textContent = dispBot.textContent;
    dispBot.textContent = elements[0]
    
})