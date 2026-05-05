import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI"
import nretLogo from "../assets/Logo/nret-logo.png"



function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-slate-50 dark:bg-[#000814] transition-colors duration-500">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] w-full p-4 lg:p-8 mx-4">
          <div className="rounded-xl bg-white dark:bg-[#0f172a] p-6 lg:p-8 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <div className="flex justify-center mb-6">
              <img src={nretLogo} alt="NRET Logo" className="h-16 w-auto" />
            </div>
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-slate-800 dark:text-white text-center">
              Choose new password
            </h1>

            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-slate-600 dark:text-slate-300">
              Almost done. Enter your new password and you&apos;re all set.
            </p>

            <form onSubmit={handleOnSubmit}>
              <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700 dark:text-slate-300">
                  New Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="w-full rounded-[0.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-[12px] pr-10 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
              </label>

              <label className="relative mt-3 block">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700 dark:text-slate-300">
                  Confirm New Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="w-full rounded-[0.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-[12px] pr-10 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer text-slate-500 dark:text-slate-400"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </span>
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] bg-blue-600 hover:bg-blue-700 py-[12px] px-[12px] font-medium text-white transition-colors duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <Link to="/login">
                <p className="flex items-center gap-x-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <BiArrowBack /> Back To Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
