import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import { getSecretWord, guessWord } from "../src/actions";
import Input from "./components/Input";

type guessedWordsType = { guessedWord: string; letterMatchCount: number };

export interface AppState {
  secretWord: string;
  guessedWords: guessedWordsType[];
  success: boolean;
  getSecretWord: () => {};
  guessWord: (word: string) => {};
}
// this interface needs to be empty and extending the type of mapStateToProps (StateProps) &
// mapDispatchToProps (DispatchProps). That way you won't need to pass in any props when you use this
// component in index.tsx (imported as "App").
// This is b/c the props used in this component are coming from mapStateToProps & mapDispatchToProps
// mapStateToProps gets the non-action creator functions fields from the state from the redux store and passes it in as props to this component
// mapDispatchToProps gets the action creator functions from the state from the redux store and passes it in as props to this component
interface ComponentProps extends StateProps, DispatchProps {}

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
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success} />
        <Input guessWord={this.props.guessWord} />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

type guessedWordType = { guessedWord: string; letterMatchCount: number };

interface StateProps {
  secretWord: string;
  success: boolean;
  guessedWords: guessedWordType[];
}

const mapStateToProps = (state: AppState): StateProps => {
  const { success, secretWord, guessedWords } = state;
  return { success, secretWord, guessedWords };
};

interface DispatchProps {
  guessWord: (word: string) => {};
  getSecretWord: () => {};
}
const mapDispatchToProps: DispatchProps = {
  getSecretWord,
  guessWord,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp);
