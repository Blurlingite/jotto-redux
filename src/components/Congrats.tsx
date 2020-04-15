import React from "react";
import PropTypes from "prop-types";

/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if 'success prop is false)
 */

interface ComponentProps {
  success: boolean;
}
const Congrats = (props: ComponentProps) => {
  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  // make it required b/c we should not render this component if we don't know
  // if word has been guessed correctly.
  // Note: your tests will check if this prop is there b/c of "isRequired"
  success: PropTypes.bool.isRequired,
};
export default Congrats;
