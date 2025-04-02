import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Building, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from '../context/AuthContext';


type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  institution?: string;
  general?: string;
};

export const SignUp = () => {
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();



  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);


  
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    institution: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [backendErrors, setBackendErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(backendErrors).length > 0) {
      const timer = setTimeout(() => {
        setBackendErrors({});
      }, 5000); // Clear errors after 5 seconds
  
      return () => clearTimeout(timer); // Cleanup on unmount or re-trigger
    }
  }, [backendErrors]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
  
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.institution.trim()) newErrors.institution = "Institution is required";
  
    // Update state only if there are changes
    if (JSON.stringify(errors) !== JSON.stringify(newErrors)) {
      setErrors(newErrors);
    }
  
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  
    validateForm();
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsLoading(true);
    setBackendErrors({}); // Clear previous errors
  
    try {
      const response = await registerUser(formData); // Call register function
  
      console.log("🔹 API Response:", response); // Debugging
  
      
      if (response.status === "error") {
        console.error("❌ Registration Error:", response.errors);
      
        const extractedErrors: FormErrors = {
          general: response.message || "Registration failed. Please try again.",
          fullName: response.errors?.fullName?.[0] || "",
          email: response.errors?.email?.[0] || "",
          password: response.errors?.password?.[0] || "",
          confirmPassword: response.errors?.confirmPassword?.[0] || "",
          institution: response.errors?.institution?.[0] || "",
        };
      
        setBackendErrors(extractedErrors);
      
        setTimeout(() => {
          console.log("✅ Updated errors state:", extractedErrors);
        }, 100);
      }
      else {
        navigate("/signin", { state: { message: "Account created successfully. Please log in." } });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setBackendErrors({ general: "An unexpected error occurred. Please try again." });
    }
  
    setIsLoading(false);
  };
  
  

    
  


  return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center bg-gradient-to-b from-green-50 to-blue-50">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-green-600 hover:text-green-500">
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
            {Object.entries(backendErrors)
            .filter(([_, value]) => value && value.trim()) // Ensures only non-empty errors are displayed
            .map(([key, value]) => (
              <div key={key} className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {value}
              </div>
            ))}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      id="fullName" 
                      name="fullName" 
                      type="text" 
                      required 
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm`} 
                      placeholder="John Doe" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                    />
                  </div>
                  {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="email" name="email" type="email" autoComplete="email" required className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm`} placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select id="role" name="role" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md" value={formData.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Administrator</option>
                    <option value="partner">External Partner</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                    Institution
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="institution" name="institution" type="text" className={`block w-full pl-10 pr-3 py-2 border ${errors.institution ? 'border-red-300' : 'border-gray-300'} rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm`} placeholder="University name" value={formData.institution} onChange={handleChange} />
                  </div>
                  {errors.institution && <p className="mt-2 text-sm text-red-600">
                      {errors.institution}
                    </p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="password" name="password" type="password" required className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm`} placeholder="••••••••" value={formData.password} onChange={handleChange} />
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="confirmPassword" name="confirmPassword" type="password" required className={`block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm`} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
                  </div>
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>}
                </div>
                <div>
                <button 
                  type="submit" 
                  disabled={!validateForm() || isLoading}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};
async function register(fullName: string, email: string, password: string, confirmPassword: string, role: string, institution: string) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      confirmPassword,
      role,
      institution,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }

  return await response.json();
}

