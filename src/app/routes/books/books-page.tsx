import { BookSearchBar } from "app/components/book-search/book-search-bar";
import { Page } from "app/components/page/page";
import React from "react";

export function BooksPage(props: React.PropsWithChildren) {
  return (
    <Page
      display="flex"
      flexFlow="column"
      alignItems="stretch"
      justifyContent="start"
    >
      {/* Header */}
      <BookSearchBar onSearch={(query) => {}} onNew={() => {}}></BookSearchBar>
      {/* Body */}

      {/* Router outlet. The router outlet is for popups */}
    </Page>
  );
}
