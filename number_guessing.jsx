import React, { Component, createRef } from 'react';
import Try from './Try';



function getNumbers() { 
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberGuessing extends Component {

  state = {
    result: '',
    value: '',
    answer: getNumbers(), 
    tries: [],
  };

  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '4 Digits match! Well done',
          tries: [...prevState.tries, { try: value, result: 'Correct!' }],
        }
      });
      alert('Restart the game');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { 
      alert(
     `Used up your 10 chances. The answer was ${answer.join(',')}`)
        alert('Restart the game');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
          result:'',
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: ` '${strike} O, ${ball} △`}],
            value: '',
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef
  

  render() {
    const mystlye = {
     marginLeft: "154px",
     paddingTop: "10px"
    };

    const trialstyle = {
      backgrondColor: 'white'
        }

    const { result, value, tries } = this.state;
    return (
      <div style={mystlye}>
        <div> Guess 4 digits of number!</div>
        <div> ◯ = number + position △ = number</div> 
        <h2>{result}</h2>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
        <div style={trialstyle}>Trial: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return (
              <Try key={`${i + 1} Trial :`} tryInfo={v} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default NumberGuessing