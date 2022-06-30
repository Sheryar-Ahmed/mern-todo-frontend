import React from 'react';
import styled from 'styled-components';
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Send';
import PasswordIcon from '@mui/icons-material/Password';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Wrapper = styled.div`
width:100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
min-width: 20rem;
`;
const Container = styled.div`
width: 25%;
min-width: 18rem;
min-height:20rem;
max-height:20rem;
background: black;
border-radius:4px;
border:1px solid #ddd;
background: transparent;
background-color: beige;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding:1rem;

span{
 font-size: 18px;
 color:black;
 margin-bottom: 1rem;
}
h6{
  margin:0px 0px 0.3rem 0px;
  color:red;
}
`;
const FormControl = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const SignIn = () => {

  const navigate = useNavigate();

  const [error, setError] = React.useState(false);
  const authUser = async (values) => {
    try {
      const user = await axios.post(" https://james-todo-list.herokuapp.com/api/auth", values);
      window.sessionStorage.setItem('Email', JSON.stringify(user.data));
      window.sessionStorage.setItem('token', user.data.Token);
      if (user.data) return navigate("/")
    } catch (ex) {
      setError(ex.response.data);
    }
  };
  //using formik
  const formik = useFormik({
    initialValues: {
      "Email": "",
      "password": ""
    },
    onSubmit: values => {
      authUser(values)
    },
  });
  return (
    <Wrapper>
      <Container>
        <span>Welcome</span>
        <FormControl onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            type="email"
            id="Email"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required={true}
            sx={{ margin: '1rem 0' }}
            onChange={formik.handleChange}
            value={formik.values.Email}
          />
          <TextField
            fullWidth
            type="password"
            id="password"
            label="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required={true}
            sx={{ margin: '1rem 0' }}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {error && <h6>{error}</h6>}
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            type="submit"
          >
            SignIn
          </Button>
        </FormControl>
        <p>
          If you don't have an account, You can{" "}
          <Typography
            component={Link}
            to='/signup'
          >
            Register
          </Typography>
          {" "}here.
        </p>
      </Container>
    </Wrapper>
  );
}

export default SignIn;