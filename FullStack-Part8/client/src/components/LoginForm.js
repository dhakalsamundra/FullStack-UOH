import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("user", token);
      setPage("authors");
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const result = await login({
      variables: { username, password },
    });

    if (result) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user", token);
      setPage("authors");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
