import userEvent, { UserEvent } from "@testing-library/user-event";
import { BookSearchBar, BookSearchBarProps } from "./book-search-bar";
import { render } from "app/utils/test";
import { screen, fireEvent } from "@testing-library/react";

describe("Test Search Bar", () => {
  const inputId = "search-input";
  const searchIconId = "search-icon-button";
  const query = "rough";
  let searchHandler: BookSearchBarProps["onSearch"];
  let newBookHandler: BookSearchBarProps["onNew"];
  let logoutHandler: BookSearchBarProps["onLogout"];

  beforeEach(() => {
    searchHandler = jest.fn();
    newBookHandler = jest.fn();
    logoutHandler = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("shows text passed into props", () => {
    render(
      <BookSearchBar
        query={query}
        onNew={newBookHandler}
        onSearch={searchHandler}
        onLogout={logoutHandler}
      />
    );
    const input = screen.getByTestId(inputId) as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toEqual(query);
  });

  test("calls search handler when at least 500ms has passed after input", async () => {
    jest.useFakeTimers();
    render(
      <BookSearchBar
        query={query}
        onNew={newBookHandler}
        onSearch={searchHandler}
        onLogout={logoutHandler}
      />
    );
    const input = screen.getByTestId(inputId) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hell" } });
    expect(searchHandler).not.toHaveBeenCalled();
    jest.advanceTimersByTime(600);
    expect(searchHandler).toHaveBeenCalled();
    expect(searchHandler).toBeCalledWith("hell");
  }, 10000);

  test("does not call search handler if 500ms has not ellapsed before input event, and extends time", () => {
    jest.useFakeTimers();
    render(
      <BookSearchBar
        query={query}
        onNew={newBookHandler}
        onSearch={searchHandler}
        onLogout={logoutHandler}
      />
    );
    const input = screen.getByTestId(inputId) as HTMLInputElement;

    // first input
    fireEvent.change(input, { target: { value: "hell" } });
    expect(searchHandler).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);

    // fire second input, while only 200ms has ellapsed after first input
    fireEvent.change(input, { target: { value: "thine" } });
    expect(searchHandler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(600);
    expect(searchHandler).toHaveBeenCalled();
    expect(searchHandler).toHaveBeenCalledTimes(1);
    expect(searchHandler).toBeCalledWith("thine");
  });

  test("calls handler immediately search icon is clicked", () => {
    jest.useFakeTimers();
    render(
      <BookSearchBar
        query={query}
        onNew={newBookHandler}
        onSearch={searchHandler}
        onLogout={logoutHandler}
      />
    );
    const input = screen.getByTestId(inputId) as HTMLInputElement;
    const searchIcon = screen.getByTestId(searchIconId) as HTMLButtonElement;

    // first input
    fireEvent.change(input, { target: { value: "hell" } });
    expect(searchHandler).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    fireEvent.click(searchIcon);
    expect(searchHandler).toHaveBeenCalled();
    expect(searchHandler).toBeCalledWith("hell");

    jest.advanceTimersByTime(900);

    // since button was clicked, don't call searchHandler again
    expect(searchHandler).toHaveBeenCalledTimes(1);
  });
});
