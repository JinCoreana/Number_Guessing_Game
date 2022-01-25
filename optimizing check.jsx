import React, { Component } from 'react';

class Test extends Component {
    state = {
        counter: 0,
    };


onClick = () => {
    this.setState({});
};
    render() {
        console.log('rendering' this.state);
        return (
            <div>
                <button onClick={this.onClick}>Button</button>
            </div>
        )
    }

};