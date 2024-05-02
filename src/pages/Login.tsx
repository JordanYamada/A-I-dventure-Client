import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userLogin } from "../utilities/utilities";

interface User {
  client: string;
}

const LogIn: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const context = useOutletContext(); // Infer type

  // Suppress eslint error for the next line
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setUser = (context as any).setUser as React.Dispatch<React.SetStateAction<User | null>>;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userResponse = await userLogin(emailInput, passwordInput);
    if (userResponse && typeof userResponse === "object" && "user" in userResponse && "email" in userResponse) {
      const client: User = userResponse;
      setUser(client);
      console.log(client);
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="DivContainer">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmailInput(e.target.value)
            }
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordInput(e.target.value)
            }
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LogIn;
