import React, { Component } from "react";
import { connect } from "react-redux";

interface ComponentProps {
  success: boolean;
  store: any;
}

class Input extends Component<ComponentProps> {
  render() {
    const contents = this.props.success ? null : (
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success }: { success: boolean }) => {
  return { success, store: {} };
};

export default connect(mapStateToProps)(Input);
