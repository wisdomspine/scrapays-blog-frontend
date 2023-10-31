import { render } from "app/utils/test";
import { Page } from "./page";
import { screen } from "@testing-library/react";

describe("Test Full Page Wrapper", () => {
  const testId = "content";
  /**
   * This test also verify that other props are passed to the wrapper content
   */
  test("It renders the children element", () => {
    render(
      <Page>
        <span data-testid={testId}></span>
      </Page>
    );
    const content = screen.getByTestId(testId);
    expect(content).toBeTruthy();
  });

  test("It applies a minWidth of 100vw, and a minHeight of 100Vh", () => {
    render(<Page data-testid={testId}></Page>);
    const content = screen.getByTestId(testId);
    expect(getComputedStyle(content).minWidth).toEqual(`100vw`);
    expect(getComputedStyle(content).minHeight).toEqual("100vh");
  });

  test("It refuse overrides of minWidth, and maxWidth", () => {
    const width = "30vw";
    const height = "50vh";
    render(
      <Page data-testid={testId} minWidth={width} minHeight={height}></Page>
    );
    const content = screen.getByTestId(testId);
    expect(getComputedStyle(content).minWidth).not.toEqual(width);

    /**
     * Check to ensure that the default 100vw is still being used
     */
    expect(getComputedStyle(content).minWidth).toEqual(`100vw`);
    expect(getComputedStyle(content).minHeight).not.toEqual(height);

    /**
     * Check and ensure that the default 100vh is still being used
     */
    expect(getComputedStyle(content).minHeight).toEqual("100vh");
  });
});
