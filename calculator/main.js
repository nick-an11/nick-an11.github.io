const calculator = document.querySelector('.calc');
const keys = document.querySelector('.calc_keys');
const resultDisplay = document.querySelector('[data-display="result"]');
const expressionDisplay = document.querySelector('[data-display="expression"]');

const operatorSymbols = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷'
};

const state = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    overwrite: true
};

const render = () => {
    resultDisplay.value = state.currentValue;

    let expression = '';
    if (state.previousValue !== null) {
        expression = state.previousValue.toString();
        if (state.operator) {
            expression += ` ${operatorSymbols[state.operator]}`;
        }
        if (!state.overwrite) {
            expression += ` ${state.currentValue}`;
        }
    }

    expressionDisplay.textContent = expression.trim() || '0';
};

const performCalculation = () => {
    if (state.previousValue === null || state.operator === null) {
        return;
    }

    const a = parseFloat(state.previousValue);
    const b = parseFloat(state.currentValue);
    let result = 0;

    switch (state.operator) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            result = b === 0 ? 'Error' : a / b;
            break;
        default:
            result = b;
    }

    state.currentValue = result.toString();
    state.previousValue = null;
    state.operator = null;
    state.overwrite = true;
};

const handleNumber = (value) => {
    if (state.overwrite || state.currentValue === '0') {
        state.currentValue = value;
    } else {
        state.currentValue += value;
    }
    state.overwrite = false;
};

const handleDecimal = () => {
    if (state.overwrite) {
        state.currentValue = '0.';
        state.overwrite = false;
        return;
    }

    if (!state.currentValue.includes('.')) {
        state.currentValue += '.';
    }
};

const handleOperator = (operator) => {
    if (state.operator && !state.overwrite) {
        performCalculation();
    } else {
        state.previousValue = state.currentValue;
    }

    state.operator = operator;
    state.overwrite = true;
};

const handleClear = () => {
    state.currentValue = '0';
    state.previousValue = null;
    state.operator = null;
    state.overwrite = true;
};

const handleDelete = () => {
    if (state.overwrite) {
        state.currentValue = '0';
        return;
    }

    state.currentValue = state.currentValue.length > 1
        ? state.currentValue.slice(0, -1)
        : '0';
};

const handlePercent = () => {
    const value = parseFloat(state.currentValue);
    state.currentValue = (value / 100).toString();
};

const handleSignToggle = () => {
    if (state.currentValue === '0') return;
    state.currentValue = (parseFloat(state.currentValue) * -1).toString();
};

const handleKeyPress = (key) => {
    if (/^\d$/.test(key)) {
        handleNumber(key);
    } else if (key === '.') {
        handleDecimal();
    } else if (key === 'Enter' || key === '=') {
        performCalculation();
    } else if (key === 'Backspace') {
        handleDelete();
    } else if (key === 'Escape') {
        handleClear();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        const map = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' };
        handleOperator(map[key]);
    }

    render();
};

keys.addEventListener('click', (event) => {
    const key = event.target.closest('button');
    if (!key) return;

    const action = key.dataset.action;
    const value = key.dataset.value;

    switch (action) {
        case 'number':
            handleNumber(value);
            break;
        case 'decimal':
            handleDecimal();
            break;
        case 'operator':
            handleOperator(key.dataset.operator);
            break;
        case 'calculate':
            performCalculation();
            break;
        case 'clear':
            handleClear();
            break;
        case 'delete':
            handleDelete();
            break;
        case 'percent':
            handlePercent();
            break;
        case 'sign':
            handleSignToggle();
            break;
        default:
            break;
    }

    render();
});

window.addEventListener('keydown', (event) => {
    handleKeyPress(event.key);
});

render();