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
    if(b===0){
        return 'NO DIVIDING BY 0';
    }
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
        case '÷':
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
const del = document.querySelector('#del')


Array.from(inputs).forEach(function(input){
    input.addEventListener('click', function(){
        if (this.id == 'point' && lastContainsPoint()){
            return       
        }
        if (this.id == 'minus' && dispBot.textContent.slice(-1)== false){
            dispBot.textContent += this.textContent.toString().trim()
            return
        }else if((this.id == 'plus'|| this.id == 'times' || this.id == "divide")&&
        (dispBot.textContent.toString().slice(-3,-2) === ' ' && dispBot.textContent.toString().slice(-1) === ' ')){
            console.log("operator already exists. replaceing")
            dispBot.textContent = dispBot.textContent.toString().slice(0,-3)
        } 
        dispBot.textContent += this.textContent;
    })
})
function clearAll(){
    dispBot.textContent = '';
    dispTop.textContent = '';
}
clear.addEventListener('click', function(){
    clearAll()
})
//DEL FUNCTION
function delPress(){
    console.log("del pressed")
    let holder = dispBot.textContent.toString();
    
    if(holder.slice(-3,-2) === ' ' && holder.slice(-1) === ' '){
        dispBot.textContent = holder.slice(0,-3)
        return
    }    
    else{
        dispBot.textContent = holder.slice(0,-1)
    }
}
del.addEventListener('click',function(){
  delPress()
})

//EQUALS FUNCTION INCLUDING BODMAS
equals.addEventListener('click', function (){
    argEquals()
})
// Dividing by Zero

function div0(){
    dispTop.textContent = "You done fucked up now";
    dispBot.textContent = "NO DIVIDING BY 0"
}

function lastContainsPoint(){
    let elements = dispBot.textContent.split(' ');
    let lastElement = elements[elements.length-1];
    let lastElementElements = lastElement.split('');
    if (lastElementElements.includes('.')){
        return true
    } else {return false;}
}

//Keyboard entrys

window.addEventListener('keydown', function(input){
    const key = document.querySelector(`button[data-key="${input.keyCode}"]`)
    console.log(key.className)
    if (key.id == 'equals'){argEquals()} 
    if (key.id == 'del') {delPress()}
    if (key.id == 'clear'){clearAll()}
    if(key.className !=="input"){return} 
    if (key.id == 'point' && lastContainsPoint()){
            return       
        }
        if (key.id == 'minus' && dispBot.textContent.slice(-1)== false){
            dispBot.textContent += key.textContent.toString().trim()
            return
        }else if((key.id == 'plus'|| key.id == 'times' || key.id == "divide")&&
        (dispBot.textContent.toString().slice(-3,-2) === ' ' && dispBot.textContent.toString().slice(-1) === ' ')){
            console.log("operator already exists. replaceing")
            dispBot.textContent = dispBot.textContent.toString().slice(0,-3)
        } 
        dispBot.textContent += key.textContent;
})

//Equals function
function argEquals(){
    let elements = dispBot.textContent.split(' ')
    while(elements.length > 1){
        console.log(elements)
        
        if(elements.includes('x') || elements.includes('÷')){
            console.log("contains operator")
            let opInd = elements.indexOf('x') 
            let opInd2 = elements.indexOf('÷')
            console.log(`${opInd}, ${opInd2}`)
            
            if(opInd !==-1 && opInd2 !==-1){
                console.log("Both times and divide exist")
                if(opInd > opInd2){
                    opInd = opInd2;
                }
            }else if (opInd ===-1){
                console.log("divide exists but not times")
                opInd = opInd2;
                if(elements[opInd+1] == 0){
                    div0();
                    return
                }
            }
            
            elements[opInd] = operate(elements[opInd-1],elements[opInd], elements[opInd+1])
            elements.splice(opInd-1,1);
            elements.splice(opInd,1);
            continue;
        }
            let opInd = elements.indexOf('-') 
            let opInd2 = elements.indexOf('+')
            console.log(`${opInd}, ${opInd2}`)
            
            if(opInd !==-1 && opInd2 !==-1){
                console.log("Both plus and minus exist")
                if(opInd > opInd2){
                    opInd = opInd2;
                }
            }else if (opInd ===-1){
                console.log("minus exists but not divide")
                opInd = opInd2;
            }
            
            elements[opInd] = operate(elements[opInd-1],elements[opInd], elements[opInd+1])
            elements.splice(opInd-1,1);
            elements.splice(opInd,1);

    }

    console.log(elements)
    let answer = parseFloat(elements[0]);
    console.log(`${answer} ${typeof answer}`)
    if(answer.toString().split('').includes('.') && answer.toString().length > 10){
        console.log("Shortening Answer")
        answer = answer.toFixed(5);
    }


    dispTop.textContent = dispBot.textContent;
    dispBot.textContent = answer
}