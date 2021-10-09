import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

function Register(props) {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  // zainicjuj funkcję useForm ale wcześniej pobierz z z niej:
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //? hmm kiedy pobieramy dane z Query poprzez useQuery piszemy const { loaging, data}, tutaj piszemy nawias kwadratowy a poza tym przesyłamy obiekt update...
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      proxy,
      {
        data: {
          register: { userData },
        },
      }
    ) {
      //? console.log(result) Tutaj też potrójna destrukturyzacja
      context.login(userData);
      //? również używamy login w register ponieważ to jest to samp

      props.history.push("/");
      //? ciekawe, że przy history musimy podać props
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      //? Jakies jebane errorory zapisujemy je w useState Errors
    },
    variables: values,
  });

  //? objeście, wynosimy addUser na samą górę w ten sposób, ponieważ wszystko z 'function' jest ładowane w pierwszej kolejności.
  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>

        <Form.Input label="Username" placeholder="Username.." name="username" type="text" value={values.username} error={errors.username ? true : false} onChange={onChange} />

        <Form.Input label="Email" placeholder="Email.." name="email" type="email" value={values.email} error={errors.email ? true : false} onChange={onChange} />

        <Form.Input label="Password" placeholder="Password.." name="password" type="password" value={values.password} error={errors.password ? true : false} onChange={onChange} />

        <Form.Input label="Confirm Password" placeholder="Confirm Password.." name="confirmPassword" type="password" value={values.confirmPassword} error={errors.confirmPassword ? true : false} onChange={onChange} />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
