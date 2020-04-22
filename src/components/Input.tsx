import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "../actions";

interface ComponentProps {
  success: boolean;
  guessWord: (word: string) => {};
}

interface LocalState {
  currentGuess: string;
}

export class Input extends Component<ComponentProps, LocalState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { currentGuess: "" };
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(event: any) {
    event.preventDefault();
    const guessedWord = this.state.currentGuess;

    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }
    this.setState({ currentGuess: "" });
  }
  render() {
    const contents = this.props.success ? null : (
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          value={this.state.currentGuess}
          onChange={(e) => this.setState({ currentGuess: e.target.value })}
          placeholder="enter guess"
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(evt) => this.submitGuessedWord(evt)}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = (
  { success }: { success: boolean },
  guessWord: any

  // guessWord: (word: string) => {}
) => {
  return { success, guessWord };
};

export default connect(mapStateToProps, { guessWord })(Input);
