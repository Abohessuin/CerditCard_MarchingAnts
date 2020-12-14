//Html selector
const numberOfCard = document.querySelector(".numberOfCard");
const cardDigitValue = document.querySelectorAll(".cardDigitValue");
const cerditCardNum = document.querySelector(".cerditCardNum");
const holderName = document.querySelector(".holderName");
const expiredDate = document.querySelector(".expiredDate");
const nameOfCard = document.querySelector(".nameOfCard");
const theName = document.querySelector(".theName");
const selc1 = document.querySelector(".selc1");
const selc2 = document.querySelector(".selc2");
const MM = document.querySelector(".MM");
const YY = document.querySelector(".YY");
const theCvvValue = document.querySelector(".theCvvValue");
const CVVvalue = document.querySelector(".CVVvalue");
const cerditCard = document.querySelector(".cerditCard");
const submit = document.querySelector(".submit");
const userCheckout=document.querySelector("#userCheckout");
const endText=document.querySelector(".endText");
const mohamed=document.querySelector(".mohamed");
const FlipCard=document.querySelector(".Flip-Card");
const payinfo=document.querySelector(".pay-info");


//variables declartion
var checkCardNumber;
var checkCardName;
var checkCVV;
var thefocusParts = [];
thefocusParts.push(selc1);
thefocusParts.push(selc2);
thefocusParts.push(nameOfCard);
thefocusParts.push(numberOfCard);
let myMap = new Map();
myMap.set(selc1, expiredDate);
myMap.set(selc2, expiredDate);
myMap.set(nameOfCard, holderName)
myMap.set(numberOfCard, cerditCardNum)


//eventListner
document.addEventListener("click", setFieldFocus);
document.addEventListener("click",flipTheCard);
nameOfCard.addEventListener("input", setCerditName);
numberOfCard.addEventListener("input", setCardDigits);
selc1.addEventListener("change", setCardMonth);
selc2.addEventListener("change", setCardYear);
theCvvValue.addEventListener("input", setCvvValue);
submit.addEventListener("click", checkCerditValidation)








//Functions 

function setFieldFocus(event) {
    var check = false;
    thefocusParts.forEach(element => {
        var isClickInside = element.contains(event.target);
        var targeted = myMap.get(element);
        if (isClickInside && element === selc2 || isClickInside && element === selc1) {
            check = true;
        }
        if (isClickInside) {
            targeted.classList.remove("removeFocus");
            targeted.classList.add("focusCardFields");
        } else {
            if (!check && element != selc2 || !check && element != selc1) {
                targeted.classList.remove("focusCardFields");
                targeted.classList.add("removeFocus");
            }

        }
    });
}


function setCardDigits(e) {

    var userInput = e.target.value;
    var currDiv = 0, currInputDigit = 0;
    while (currDiv < cardDigitValue.length) {


        if (userInput[currInputDigit] === " ") {
            currInputDigit++
        }

        else if (typeof userInput[currInputDigit] === 'undefined') {
            cardDigitValue[currDiv].innerHTML = "#";
            currDiv++;

        } else {
            cardDigitValue[currDiv].innerHTML = userInput[currInputDigit];
            currDiv++;
            currInputDigit++;
        }
    }
    checkCardNumber = userInput;
   
}



function setCerditName(e) {
    var userInput = e.target.value;
    theName.innerHTML = userInput;
    checkCardName = userInput;
}


function setCardMonth(e) {
    var userInput = e.target.value;
    MM.innerHTML = userInput;

}

function setCardYear(e) {
    var userInput = e.target.value;
    YY.innerHTML = userInput;
}

function setCvvValue(e) {
    var userInput = e.target.value;
    CVVvalue.innerHTML = userInput;
    checkCVV = userInput;
}


function flipTheCard(event) {
    var isClickInside = theCvvValue.contains(event.target);
    if (isClickInside) {
        cerditCard.classList.remove("flipTheCardRev");
        cerditCard.classList.add("flipTheCard");
    } else {
        cerditCard.classList.remove("flipTheCard");
        cerditCard.classList.add("flipTheCardRev");
    }

}

function alphanumeric(inputtxt) {
    var x=String(inputtxt)
    var letterNumber = /^[a-zA-Z]+$/;
    if ((x.match(letterNumber))) {
        return true;
    }
    else {

        return false;
    }
}



function  CountNumber(number,flag){
    var v=String(number);
     if(flag===1){
         return v.length-3;
     }else{
         return v.length;
     }
}



function checkCerditValidation(e) {
     e.preventDefault() 
    var flagCrdNum, flagCrdNam, flagCrdCvv
    var flag=true;
    
    //check crdNum
    String.prototype.isNumber = function(){return /^\d+$/.test(this);}
    String(checkCardName).isNumber;
    flagCrdNum=String(checkCardName).isNumber;
    var len=CountNumber(checkCardNumber,1);
    console.log(flagCrdNum);
    if(!flagCrdNum||len!=16){
        flag=false;
        cerditCardNum.classList.add("focusInvalid");
    }else{
        cerditCardNum.classList.remove("focusInvalid");
    }

    //check crdNam
   const name=checkCardName.replace(/\s/g, '');
    console.log(name);
    flagCrdNam=alphanumeric(name);
    if(!flagCrdNam){
        flag=false;
        holderName.classList.add("focusInvalid");
    }else{

        holderName.classList.remove("focusInvalid");
    }

    //check crcCVV
    flagCrdCvv=String(checkCardNumber).isNumber;
    var len=CountNumber(checkCVV,0);
    console.log(flagCrdCvv);
    if(!flagCrdNum||len!=3){
        flag=false;
        CVVvalue.classList.add("focusInvalid");
    }else{
        CVVvalue.classList.remove("focusInvalid");
    }


    if(!flag){
        
        
      alert("The Card Number should accept only numbers and must be 16 digits\n  The Card Name can only be alphanumeric and cannot contain any special\nThe CVV Number should accept only numbers and must be 3 digits.");
                
    }else{
        const lastPage = gsap.timeline();
        lastPage.fromTo(FlipCard,2,{x:"0"},{x:"-400%"})
        lastPage.fromTo(payinfo,2,{opacity:"1"},{opacity:"0"});
        lastPage.fromTo(userCheckout,2,{y:"-100%"},{y:"0%"})
        lastPage.fromTo(endText,2,{opacity:"0"},{opacity:"1"})
        lastPage.fromTo(mohamed,2,{color:"white"},{color:"red"})
        
    }

}