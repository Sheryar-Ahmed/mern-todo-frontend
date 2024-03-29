import React from 'react';
import styled from 'styled-components';
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Send';
import PasswordIcon from '@mui/icons-material/Password';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import ALertMsg from '../components/AlertMsg';
import axios from 'axios';
import { url } from '../lib/backend';

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

`;
const FormControl = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const SignUp = () => {
  const navigate = useNavigate();

  const [error, setError] = React.useState(false);
  const [showSnack, setShowSnack] = React.useState(false);
  const [loading, setLoading] = React.useState(null);

  const RegisterUser = async (values) => {
    try {
      setLoading(true);
      const user = await axios.post(`${url}/api/users/register`, values);
      window.sessionStorage.setItem("Email", JSON.stringify(user.data))
      setShowSnack(true);
      setLoading(false);
      if (user) return navigate('/signIn');
    } catch (ex) {
      setError(ex.response.data);
      setLoading(false);
    }
  };
  //using formik
  const formik = useFormik({
    initialValues: {
      "Email": "",
      "password": ""
    },
    onSubmit: values => {
      RegisterUser(values)
    },
  });
  return (
    <Wrapper>
      <Container>
        <span>SignUp</span>
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
          {!loading ? error && <h6>{error}</h6> : <CircularProgress color="success" sx={{ position: 'absolute' }} />}
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            type="submit"
          >
            SignUp
          </Button>
        </FormControl>
        <p>
          If you have Already an account, You can{" "}
          <Typography
            component={Link}
            to='/signin'
          >
            Login
          </Typography>
          {" "}here.
        </p>
        {showSnack && <ALertMsg text="Registered" show={showSnack} setShow={setShowSnack} />}
      </Container>
    </Wrapper>
  );
}

export default SignUp;