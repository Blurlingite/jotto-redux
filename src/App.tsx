import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import { getSecretWord } from "../src/actions";
import Input from "./components/Input";

type guessedWordType = { guessedWord: string; letterMatchCount: number };
interface ComponentProps {
  success: boolean;
  guessedWords: guessedWordType[];
  getSecretWord: () => {};
}

// we are only exporting here so we can test our unconnected component, (once you export using connect() the component is connected)
// This way we can mock the getSecretWord as a prop to that unconnected compoennt so we can test it by seeing
// when getSecretWord (real function) is called, which should be in componentDidMount()
export class UnconnectedApp extends Component<ComponentProps> {
  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { success, guessedWords, secretWord } = state;

  return { success, guessedWords, secretWord };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
