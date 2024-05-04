import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // Suppress eslint error for the next line
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setUser = (context as any).setUser as React.Dispatch<React.SetStateAction<User | null>>;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userResponse = await userLogin(emailInput, passwordInput);
    if (userResponse && typeof(userResponse) === "object" && "client" in userResponse) {
      const client: User = userResponse;
      setUser(client);
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="DivContainer">
      <h2>Login</h2>
      <Form className="FormBody" onSubmit={handleLogin}>
        <Form.Group className="mb-3 FormInput" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmailInput(e.target.value)
            }
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 FormInput" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordInput(e.target.value)
            }
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="secondary outline-secondary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LogIn;
