import React from 'react';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      ClickCount:0,
      IamDisabled : true
    };
    this.ClickMe = this.ClickMe.bind(this);
}

ClickMe(){
  this.setState({
    ClickCount:this.state.ClickCount + 1
  });
}

  render() {
    return (
      <div>
        <button id="ClickMe" className="click-me" onClick={this.ClickMe}>Click Me</button>
        <p>You clicked me :: {this.state.ClickCount}</p>
        <button id=" IamDisabled " className="click-me" disabled={this.state.IamDisabled}>Disabled</button>
      </div>
    )
  }
};

export default App;