import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../utilities/utilities";

// Define the User interface
interface User {
  client: string;
}

// Define the SignUpResponse interface
interface SignUpResponse {
  token: string;
  client: string;
}

const SignUp: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const context = useOutletContext();
  const navigate = useNavigate();

  // Define the OutletContextType interface
  interface OutletContextType {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    // Add other properties as needed
  }

  // Cast context to OutletContextType
  const setUser = (context as OutletContextType).setUser;

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post<SignUpResponse>("users/signup/", {
        email: emailInput,
        password: passwordInput,
      });
      if (response.status === 201) {
        console.log('successfully signed up, user info', response.data);
        const { token, client } = response.data;
        // save auth token so it can be used
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        // set user info for the app
        setUser({client});
        navigate("/");
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="DivContainer">
      <h2>Signup</h2>
      <Form className="FormBody" onSubmit={signupUser}>
        <Form.Group className="mb-3 FormInput" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)}
            type="email"
            placeholder="Enter email"
            value={emailInput}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 FormInput" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
            type="password"
            placeholder="Password"
            value={passwordInput}
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

export default SignUp;
