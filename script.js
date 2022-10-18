console.log('This application is created to demonstrate the power of the TypeScript language. The maximum number length that can be seen on the screen is 10 characters (including floating point numbers). We recommend using more powerful applications/calculators for serious tasks.');
var first = '', second = '', sign = '', finish = false, error = false;
var digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
var action = ['+', '-', 'x', '/'];
var result = document.querySelector('.calc-screen p');
function clearAll() {
    first = '';
    second = '';
    sign = '';
    finish = false;
    error = false;
    result.textContent = 0;
}
var numShortener = function (el) {
    if (el.toString().length > 10) {
        el = Number(el).toFixed(10).toString();
        while (el[el.length - 1] == '0')
            el = el.slice(0, -1);
        if (el[el.length - 1] === '.')
            el = el.slice(0, -1);
    }
    if (el.length > 10) {
        while (el.length > 10)
            el = el.slice(0, -1);
    }
    return el;
};
var clearBtn = document.querySelector('.ac');
clearBtn.onclick = clearAll;
var buttons = document.querySelector('.buttons');
buttons.onclick = function (event) {
    if (!event.target.classList.contains('btn'))
        return;
    if (event.target.classList.contains('ac'))
        return;
    if (error)
        return;
    var key = event.target.textContent;
    if (digit.indexOf(key) !== -1) {
        if (second === '' && sign === '') {
            if (first === '' && key === '.')
                first += '0.';
            else if (first === '0' && key === '0')
                first += '';
            else
                first += (key === '.' && first.toString().indexOf(key) !== -1) ? '' : key;
            result.textContent = (first.toString().length > 10) ? 'Input is too long' : first;
        }
        else if (first !== '' && second !== '' && finish) {
            second = key;
            finish = false;
            result.textContent = second;
        }
        else {
            if (second === '' && key === '.')
                second += '0.';
            else if (second === '0' && key === '0')
                second += '';
            else
                second += (key === '.' && second.toString().indexOf(key) !== -1) ? '' : key;
            result.textContent = (second.toString().length > 10) ? 'Input is too long' : second;
        }
        return;
    }
    if (action.indexOf(key) !== -1) {
        sign = key;
        result.textContent = sign;
        return;
    }
    if (key === '+/-') {
        if (first !== '' && first !== '0' && first !== '0.') {
            first = (-first).toString();
            result.textContent = first;
        }
    }
    if (key === '%') {
        if (second === '') {
            first = ((+first) * 0.01).toString();
            first = numShortener(first);
            result.textContent = first;
        }
        else {
            second = ((+first) / 100 * (+second)).toString();
            second = Number(numShortener(second)).toString();
            result.textContent = second;
        }
    }
    if (key === '=') {
        if (first.toString().indexOf('e') !== -1) {
            result.textContent = 'Result is too low';
            return;
        }
        if (first === '')
            first = 0;
        if (second === '')
            second = first;
        switch (sign) {
            case '+':
                first = (+first) + (+second);
                break;
            case '-':
                first = (+first) - (+second);
                break;
            case 'x':
                first = (+first) * (+second);
                break;
            case '/':
                if (second === '0') {
                    result.textContent = "Can't divide by zero";
                    first = '';
                    second = '';
                    sign = '';
                    return;
                }
                first = (+first) / (+second);
                break;
        }
        finish = true;
        first = numShortener(first);
        if (first.length > 10) {
            result.textContent = 'Result is too long';
            error = true;
        }
        else
            result.textContent = first;
    }
};
