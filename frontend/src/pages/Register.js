import { useState } from "react";

function Register({ onRegistered }) {
  const initialUser = {
    name: "",
    email: "",
    password: "",
    marks: ""
  };
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveLocalUser = (data) => {
    localStorage.setItem("careerAdvisorUser", JSON.stringify(data));
  };

  const register = async () => {
    if (!user.name || !user.email || !user.password) {
      alert("Please fill in your name, email, and password.");
      return;
    }

    saveLocalUser(user);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...user,
          interests: ["tech"]
        })
      });

      const data = await res.text();
      alert(data);
      if (res.ok) {
        setUser(initialUser);
        if (onRegistered) onRegistered();
      }
    } catch (err) {
      alert("Registration saved locally. You can now login.");
      setUser(initialUser);
      if (onRegistered) onRegistered();
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>

      <input name="name" placeholder="Name" value={user.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={user.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} />
      <input name="marks" placeholder="Marks" value={user.marks} onChange={handleChange} />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
