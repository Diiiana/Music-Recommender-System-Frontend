import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import avatar from "../../../assets/images/avatar.png";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';
const focusedColor = "black";
const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
    backgroundColor: "white",
    borderRadius: '1em 1em 1em 1em',
    padding: '20px'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
	},
  root: {
    "& label.Mui-focused": {
      color: focusedColor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: focusedColor,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor,
      },
    },
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

    const headers = {
      'Content-Type': 'application/json',
    }
    console.log(formData);
		axios.post(baseURL + `api/users/login/`, {
				email: formData.email,
				password: formData.password,
			}, headers)
			.then((res) => {
        console.log(res)
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				history.push('/dashboard');
			});
	};

  return (
    <div
      style={{ backgroundColor: "#00788A" }}
      className="flex h-screen justify-center items-center"
    >
      <div class="w-full max-w-md flex ">
        <form 
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        className={classes.form} noValidate>
          <img src={avatar} alt="" />
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoFocus
						onChange={handleChange}
            className={classes.root}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
            className={classes.root}
						onChange={handleChange}
					/>
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/user/register" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
      </div>
    </div>
  );
}

export default Login;
