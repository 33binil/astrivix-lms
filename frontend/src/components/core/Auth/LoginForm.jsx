import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-800 dark:text-slate-200">
          Email Address <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-[0.5rem] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 p-[12px] text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-800 dark:text-slate-200">
          Password <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-[0.5rem] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 p-[12px] pr-12 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer text-slate-500 dark:text-slate-400"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} />
          ) : (
            <AiOutlineEye fontSize={24} />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-600 dark:text-blue-400">
            Forgot Password
          </p>
        </Link>
      </label>


      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-blue-600 hover:bg-blue-700 py-[8px] px-[12px] font-medium text-white transition-colors"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm