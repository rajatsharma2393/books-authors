import React from "react";
import { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import "./App.css";

import Home from "./components/Home/home";
import Header from "./components/common/header";
import ManageBook from "./components/Books/manageBook";
import manageAuthor from "./components/Author/manageAuthor";

const Books = lazy(() => import("./components/Books/books"));
const Authors = lazy(() => import("./components/Author/authors"));

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Suspense fallback={<h1>Still Loading…</h1>}>
          <Route path="/author/:id" component={manageAuthor} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/books" component={Books} />
          <Route path="/book/:id" component={ManageBook} />
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
