import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import { getSecretWord } from "../src/actions";
import Input from "./components/Input";

interface ComponentProps {
  success: boolean;
  secretWord: string;
  guessedWords: [];
}
class App extends Component<ComponentProps> {
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

export default connect(mapStateToProps, { getSecretWord })(App);
