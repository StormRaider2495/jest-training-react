import React from 'react';
import Child from './Child';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            clickCount: 0,
            countValueFromChild: 100,
        };
        this.clickMe         = this.clickMe.bind(this);
        this.onCounterUpdate = this.onCounterUpdate.bind(this);
    }

    clickMe(): void {
        this.setState({
            clickCount: this.state.clickCount + 1
        });
    }

    private onCounterUpdate(value: number): void {
        this.setState({
            countValueFromChild: value,
        });
    }

    render(): JSX.Element {
        const { state } = this;
        return (
            <div>
                <button id="clickMe" className="click-me" onClick={this.clickMe}>Click Me</button>
                <p id="DisplayCount">You clicked me :: {this.state.clickCount}</p>

                <Child initialCounterValue = { state.countValueFromChild } counterUpdateCallback = { this.onCounterUpdate}/>
            </div>
        )
    }
}

export default App;