import SayHelloReducer from "../reducers/SayHelloReducer";
import React from "react";
import { connect } from "react-redux";
import { sayHello } from "../actions/SayHalloActions";
class Hello extends React.Component {
  componentDidMount() {
    this.props.getGreeting();
  }
  render() {
    return <div id="hello">{this.props.greeting}</div>;
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
