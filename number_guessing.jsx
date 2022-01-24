const React = require('react')
const {Component} = React;
const {createRef} = React;

class NumberGuessing extends Component {
    state = {
        try: [],
        answer:this.getNumbers(),
        result:'',
        value:''
    }



getNumbers = () => {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array =[];
    for (let i = 0; i <4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1 )[0];
        array.push(chosen)
        
    }
    return array;

}


inputRef = createRef(); 

onSubmitForm = (e) => {
    const {value, tries, answer} = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
        this.setState((prevState) => {
            return {
                result: '4 Digits match! Well done',
                tries: [ ...prevState.tries, {try: value, result: 'Correct!'}],

            }
        })
 
        alert('Restart the game')
        this.setState({
            value: '',
            answer: getNumbers(),
            tries:[],
        })
    this.inputRef.current.focus();
    }
    else{
        const answerArray = value.split('').map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9){
            this.setState({
                result:"Used up your 10 chances. The answer was ${answer.join(',')}",
             })
            alert('Restart the game')
                this.setState({
                    value: '',
                    answer:getNumber(),
                    tries: []
                })
        
        this.inputRef.current.focus();
    } else{
        for (let i =0; i <4; i += 1) {
            if(answerArray[i] === answer[i]) {
                strike +=1;
            } else if (answer.includes(answerArray[i])) {
                ball += 1;
            }
        }
        this.setState((prevState) => {
            return {
                tries: [...prevState.tries, { try: value, result: '${strike} O, ${ball} &#9651; '}],
                value: '',
            }
        })
        this.inputRef.current.focus();
    }
}
}

onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
        value: e.target.value
    });
};


 render() {
    const {result, value, tries} = this.state;
    return(
        <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
            <input ref={this.inputRef} maxLength={4} value={value} onChange={onChangeInput}/>
        </form>
        <div>Trial: {tries.length}</div>
        <ul>
            {tries.map((v,i)=> {
                return (
                    <Try key={'${i + 1} Trial : '} tryInfo={V}/>
                );
            })}
        </ul>
        </>
    );
}
}


export default NumberGuessing;