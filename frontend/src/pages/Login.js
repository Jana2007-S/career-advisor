import { useState } from "react";

function Login({ onLoginSuccess }) {
  const initialUser = {
    email: "",
    password: ""
  };
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const storedUser = localStorage.getItem("careerAdvisorUser");
    const savedUser = storedUser ? JSON.parse(storedUser) : null;
    const isLocalMatch = savedUser && savedUser.email === user.email && savedUser.password === user.password;

    let loginUser = null;
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        loginUser = data.user;
      }
    } catch (err) {
      // ignore server errors and fallback to local data
    }

    if (!loginUser && isLocalMatch) {
      loginUser = savedUser;
    }

    if (loginUser) {
      alert(`Welcome back, ${loginUser.name || loginUser.email}!`);
      setUser(initialUser);
      onLoginSuccess(loginUser);
    } else {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input name="email" placeholder="Email" value={user.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
