/*
Name : Msg2Bin
Developer : Anikesh Patel
Designer : Anikesh Patel
Date : 08/Aug/2018
* */

// Init All Elements Here
var container = document.querySelector(".container");
var rawInput = document.querySelector("#raw_input");
var binInput = document.querySelector("#bin_input");
var switchBtn = document.querySelector("#switch_btn");
var copyBtn = document.querySelector(".copy-btn");
var footerWrapper = document.querySelector(".footer_wrapper");

// Define Mode
var mode = 'msg2bin';

// rawData is contain the all whole string that user input in first input element
var rawData = "";

// binData is contain the all whole string that user input in second input element
var binData = "";

// rawWords is contain the all words in rawData as a array
var rawWords = [];

// binWords is contain the all words in binData as a array
var binWords = [];


// listening for input in firstBlock
rawInput.addEventListener('input', function(event){
    rawData = event.target.outerText;
    rawWords = rawData.split(" ");
    showBinOutPut();
});


// Listening for input in second block
binInput.addEventListener('input', function (event) {
    binData = event.target.outerText;
    binWords = binData.split("~");
    showStringOutPut();
});

// rawInput.addEventListener('keypress', function(event){
//     if ((event.keyCode === 10 || event.keyCode === 13) && event.ctrlKey){
//         showOutPut();
//     }
// });


// It's toggle the mode
switchBtn.addEventListener('click', function (event) {
    if (mode === 'msg2bin') {
        container.style.flexDirection = 'row-reverse';
        footerWrapper.style.flexDirection = 'row-reverse';
        mode = "bin2msg";
    }
    else {
        container.style.flexDirection = 'row';
        footerWrapper.style.flexDirection = 'row';
        mode = "msg2bin";
    }
});

copyBtn.addEventListener('click', function () {
    if (mode === 'msg2bin') {
        copyToClipboard(binInput.textContent);
    }
    else {
        copyToClipboard(rawInput.textContent);
    }
});


// Function for displaying the binary data into second block
function showBinOutPut() {
    var chars = [];
    var bin = "";
    for(var i=0;i<rawWords.length;i++){
        chars = rawWords[i].split('');
        for(var j=0;j<chars.length;j++){
            if (j > 0){
                bin += "-"+getBin(getASCII(chars[j]));
            }else {
                bin += getBin(getASCII(chars[j]));
            }
        }

        bin += "~";
    }
    binInput.textContent = bin;
}

function showStringOutPut() {
    var binChars = [];
    var string = "";
    for (var i=0;i<binWords.length;i++){
        binChars = binWords[i].split("-");
        for (var j=0;j<binChars.length;j++){
            string += getChar(parseInt(binChars[j],2))
        }

        string += " ";
    }

    rawInput.textContent = string;
}

const copyToClipboard = function (str){
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};


function getASCII(char){
    return char.charCodeAt();
}

function getChar(code) {
    return String.fromCharCode(code);
}

function getBin(num) {
    return num.toString(2);
}