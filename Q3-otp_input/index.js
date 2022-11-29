const display = document.getElementById('display');
const otpFields = [];
const otpLength = 6;

console.log('otpFields', otpFields);


const populateDisplay = (length) => {
    for(let i = 0; i < length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.classList.add('slot');
        display.appendChild(input);
        otpFields.push(input);
    }
}

const isDigit = (value) => {
    return /^\d+$/.test(value);
}

display.addEventListener('keydown', (e) => {
    console.log('keydown', e.target, e.key);

    const target = e.target;

    if(isDigit(e.key)) {
        console.log('key', e.key);
        target.value = '';
        return;
    }

    if(e.key === 'ArrowLeft') {
        target.previousElementSibling?.focus();
    }

    if(e.key === 'ArrowRight') {
        target.nextElementSibling?.focus();
    }


});

display.addEventListener('keyup', (e) => {
    console.log('keyup', e.target);

    const target = e.target;

    if(e.key === 'Backspace' || e.key === 'Delete') {
        target.value = '';
        target.previousElementSibling?.focus();
    }
});

display.addEventListener('input', (e) => {
    console.log('input', e.target);

    const target = e.target;

    if(!isDigit(target.value)) {
        target.value = '';
        return;
    }

    if(target.value !== '') {
        const next = target.nextElementSibling;
        if(next) {
            next.focus();
        } else if(target.parentElement.firstChild.value === '') {
            target.parentElement.firstChild.focus();
        } else {
            target.blur();
        }
    }
});

display.addEventListener('paste', e => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
  
    if (typeof pastedData === 'string' && pastedData.length === otpLength && isDigit(pastedData)) {
      otpFields.forEach((field, i) => {
        field.value = pastedData.charAt(i);
      });
    }
  });

populateDisplay(otpLength)