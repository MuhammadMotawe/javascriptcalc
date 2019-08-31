import React from 'react';
import styled from 'styled-components';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader>Muhammad&apos;s Javascript Calculator</AppHeader>
      <Calculator />
    </div>
  );
}

const AppHeader = styled.h1`
  display: block;
  width: 100vh;
  font-size: 28px;
  font-weight: bold;
  color: palevioletred;
`;

const ClearButton = props => <div className="CalcButton operator" id={props.id} onClick={props.handleClick}>{props.children}</div>

const CalcInput = props => {
  return (
        <div className="CalcInput" id={props.id}>{props.input}</div>
  );
}

class Calculator extends React.Component {
  state = {
    value: null,
    input: '0',
    waitingForOperand: false,
    operator: null
  }

  inputDigit(digit) {
    const { input, operator, waitingForOperand } = this.state;

    if(waitingForOperand && operator){
      if(input === '-') {
        this.setState({
          input: String("-" + digit),
          waitingForOperand: false
        });
      } else {
        this.setState({
          input: String(digit),
          waitingForOperand: false
        });
      }
    } else {
      this.setState({
        input: input === '0' ? String(digit) : input + digit
      });
    } 
  }

  inputDot() {
    const { input, waitingForOperand } = this.state;

    if(waitingForOperand) {
      this.setState({
        input: '0.',
        waitingForOperand: false
      });
    } else {
      this.setState({
        input: input.indexOf('.') === -1 ? input + '.' : input,
        waitingForOperand: false
      });
    }  
  }

  toggleSign() {
    const { input, waitingForOperand } = this.state;

    if(waitingForOperand) {
      this.setState({
        input: input === '-' ? "0" : "-",
      });
      console.log(waitingForOperand);
    } else {
      this.setState({
        input: input.charAt(0) === '-' ? input.substr(1) : '-' + input,
      });
    }
  }

  inputPercent() {
    const { input } = this.state;
    const value = parseFloat(input);

    this.setState({
      input: String(value/100)
    });
  }

  doOperation(nextOp) {
    const { input, operator, waitingForOperand, value } = this.state;

    const operations = {
      '/': (prev, next) => prev / next,
      '*': (prev, next) => prev * next,
      '+': (prev, next) => prev + next,
      '-': (prev, next) => prev - next,
      '=': (prev, next) => next,
    }

    let nextVal = parseFloat(input);

    if (operator && waitingForOperand && nextOp === '-') {
      this.toggleSign();
      this.setState({
        waitingForOperand: false,
        operator: operator
      });
    }
      
    else if (value === null) {
      this.setState({
        value: nextVal,
        waitingForOperand: true,
        operator: nextOp
      });
    }
    else if(operator) {
      const currentVal = value || 0;
      const result = operations[operator](currentVal, nextVal);


      this.setState({
        value: result,
        input: String(result),
        waitingForOperand: true,
        operator: nextOp
      });
    }

    
  }

  render() {
    return(
      <div className="CalcWrapper">
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        <CalcInput id="display" input={this.state.input}></CalcInput>
        
        <div className="CalcRow">
          <button className="CalcButton" id="seven" onClick={() => this.inputDigit(7)}>7</button>
          <button className="CalcButton" id="eight" onClick={() => this.inputDigit(8)}>8</button>
          <button className="CalcButton" id="nine" onClick={() => this.inputDigit(9)}>9</button>
          <button className="CalcButton operator" id="divide" onClick={() => this.doOperation('/')}>/</button>
        </div>
        <div className="CalcRow">
          <button className="CalcButton" id="four" onClick={() => this.inputDigit(4)}>4</button>
          <button className="CalcButton" id="five" onClick={() => this.inputDigit(5)}>5</button>
          <button className="CalcButton" id="six" onClick={() => this.inputDigit(6)}>6</button>
          <button className="CalcButton operator" id="multiply" onClick={() => this.doOperation('*')}>x</button>
        </div>
        <div className="CalcRow">
          <button className="CalcButton" id="one" onClick={() => this.inputDigit(1)}>1</button>
          <button className="CalcButton" id="two" onClick={() => this.inputDigit(2)}>2</button>
          <button className="CalcButton" id="three" onClick={() => this.inputDigit(3)}>3</button>
          <button className="CalcButton operator" id="add" onClick={() => this.doOperation('+')}>+</button>
        </div>
        <div className="CalcRow">
          <button className="CalcButton" id="decimal" onClick={() => this.inputDot()}>.</button>
          <button className="CalcButton" id="zero" onClick={() => this.inputDigit(0)}>0</button>
          <button className="CalcButton" id="equals" onClick={() => this.doOperation('=')}>=</button>
          <button className="CalcButton operator" id="subtract" onClick={() => this.doOperation('-')}>-</button>
        </div>
        <div className="CalcRow">
          <ClearButton id="clear" handleClick={() => this.setState({ input: '0'})}>AC</ClearButton>
          <button className="CalcButton operator" id="precent" onClick={() => this.inputPercent()}>%</button>
        </div>
      </div>
    );
  }
}

export default App;
