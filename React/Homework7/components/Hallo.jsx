import React from "react";
import { connect } from "react-redux";
//import { SayHelloReducer } from "./../reducers/SayHelloReducer";
import { sayHello } from "./../actions/SayHelloActions";

class Hello extends React.Component {
  componentDidMount() {
    this.props.getGreeting();
  }

  render() {
    return (
      <div id="hello">
        <h2>{this.props.greeting}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    greeting: state.SayHelloReducer.greeting,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGreeting: () => {
      dispatch(sayHello());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
