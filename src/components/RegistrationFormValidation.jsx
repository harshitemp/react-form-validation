import { useState } from "react";

export default function RegistrationFormValidation() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) tempErrors.email = "Invalid email format";
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    if (Object.keys(tempErrors).length > 0) setErrors(tempErrors);
    else {
      alert(`Registration Successful!\nName: ${formData.name}\nEmail: ${formData.email}`);
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <div style={{ maxWidth:"400px", margin:"50px auto", padding:"30px", background:"#fff", borderRadius:"16px", boxShadow:"0 8px 25px rgba(0,0,0,0.1)", fontFamily:"Arial,sans-serif" }}>
      <h2 style={{ textAlign:"center", marginBottom:"25px", color:"#222" }}>Registration Form with Validation</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom:"20px" }}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width:"100%", padding:"10px", borderRadius:"8px", border: errors.name ? "2px solid #e53935" : "1px solid #ccc" }} />
          {errors.name && <span style={{ color:"#e53935", fontSize:"13px" }}>{errors.name}</span>}
        </div>
        <div style={{ marginBottom:"20px" }}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width:"100%", padding:"10px", borderRadius:"8px", border: errors.email ? "2px solid #e53935" : "1px solid #ccc" }} />
          {errors.email && <span style={{ color:"#e53935", fontSize:"13px" }}>{errors.email}</span>}
        </div>
        <div style={{ marginBottom:"25px" }}>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width:"100%", padding:"10px", borderRadius:"8px", border: errors.password ? "2px solid #e53935" : "1px solid #ccc" }} />
          {errors.password && <span style={{ color:"#e53935", fontSize:"13px" }}>{errors.password}</span>}
        </div>
        <button type="submit" style={{ width:"100%", padding:"12px", backgroundColor:"#2196f3", color:"#fff", fontWeight:"600", borderRadius:"10px", border:"none", cursor:"pointer" }}>Register</button>
      </form>
    </div>
  );
}
