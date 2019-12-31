import React from "react";
import { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Books from "./components/Books/books";
import Home from "./components/Home/home";
import Authors from "./components/Author/authors";
import Header from "./components/common/header";
import ManageBook from "./components/Books/manageBook";
import manageAuthor from "./components/Author/manageAuthor";
//const Books = lazy(() => import("./components/Books/books"));

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/books" component={Books} />
        <Route path="/book/:id" component={ManageBook} />
        <Route path="/author/:id" component={manageAuthor} />
        <Route exact path="/authors" component={Authors} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
