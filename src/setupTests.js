// Jest will automatically search for this file based off its name (it must be setupTests.js)
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

// We are configuring Enzyme here so we don't have to do it in each test file
Enzyme.configure({ adapter: new EnzymeAdapter(),
disableLifecycleMethods:true // so we don't call the componentDidMount or componentDidUpdate everytime we declare a shallow wrapper in our tests. Now we can call those methods just when we need to in our tests
});
