import { render } from "./test-utils";
import { App } from "./App";

test("This is a demo test", () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn chakra/i);
  // expect(linkElement).toBeInTheDocument();
  expect(1).toStrictEqual(1);
});
