import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {validateAuth} from "../components/ValidateAuth";
import {supabase} from "../services/supabaseClient";

import FloatingInput from "../components/FloatingInput";
import VisbilityOn from "../assets/icons/eye.svg";
import VisbilityOff from "../assets/icons/eye-off.svg";

import "../styles/Authentication.css";

export default function Authentication({mode}) {
  const isLoggedIn = mode === "login";

  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const toggleVisbility = () => {
    setIsVisible(!isVisible);
  };

  const toggleAuthMode = () => {
    if (isLoggedIn) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setError("");
  }, [mode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const errors = validateAuth({
      mode,
      username,
      email,
      password,
      repeatPassword,
    });

    if (errors.length > 0) {
      setError(errors.join(". "));
      return;
    }

    try {
      if ( isLoggedIn) {
        const {error} = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        navigate(from, {replace: true});
      } else {
        const {error} = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            },
          },
        });

        if (error) throw error;

        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="auth-section">
      <div className="wrapper">
        <div className="auth-heading">
          <p className="logo">The Pavillion</p>
          <h1>{isLoggedIn ? "Login" : "Create an account"}</h1>
        </div>

        <form id="auth-form" onSubmit={handleSubmit}>
          {!isLoggedIn && (
            <>
              <FloatingInput
                id="firstname"
                label="First Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <FloatingInput id="surname"
               label="Surname" 
               value={surname}
               onChange={(e)=> setSurname(e.target.value)}/>
            </>
          )}

          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FloatingInput
            id="password"
            label="Password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <button type="button" onClick={toggleVisbility} id="visibility-btn">
              <i className={isVisible? "fa-regular fa-eye-slash": "fa-regular fa-eye"}></i>
            </button>
          </FloatingInput>

          {!isLoggedIn && (
            <>
              <FloatingInput
                id="repeat-password"
                label="Repeat Password"
                type={isVisible ? "text" : "password"}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              >
                <button type="button" onClick={toggleVisbility} id="visibility-btn">
                  <i className={isVisible?"fa-regular fa-eye-slash": "fa-regular fa-eye"}></i>
                </button>
              </FloatingInput>
            </>
          )}

          {error && <p style={{color: "red"}}>{error}</p>}

          <button type="submit" onClick={handleSubmit} className="auth-btn">
            {isLoggedIn ? "Login" : "Sign Up"}
          </button>

          <p className="auth-mode-text">
            {isLoggedIn ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={toggleAuthMode} className="auth-mode-btn">
              {isLoggedIn ? "Sign Up" : "Log In"}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}
