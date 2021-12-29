import React from 'react';

class Child extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            clickCount: this.props.initialCounterValue ?? 0,
        };
        this.clickMe = this.clickMe.bind(this);
    }

    clickMe(): void {
        this.setState({
            clickCount: this.state.clickCount + 1
        });
        if (this.props.counterUpdateCallback) {
            this.props.counterUpdateCallback(this.state.clickCount + 1);
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>This is Child Component</h1>
                <button id="clickMe" className="click-me" onClick={this.clickMe}>Click Me</button>
                <p id="DisplayCount">You clicked me :: {this.state.clickCount}</p>
            </div>
        )
    }
}

export default Child;