import React, { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"



function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-slate-50 dark:bg-[#000814] transition-colors duration-500">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] w-full p-4 lg:p-8 mx-4">
          <div className="rounded-xl bg-white dark:bg-[#0f172a] p-6 lg:p-8 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-slate-800 dark:text-white">
              {!emailSent ? "Reset your password" : "Check email"}
            </h1>
            <div className="my-4 text-[1.125rem] leading-[1.625rem] text-slate-600 dark:text-slate-300">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : <p>We have sent the reset email to <span className="text-blue-600 dark:text-blue-400 font-semibold">{email}</span></p>}
            </div>

            <form onSubmit={handleOnSubmit}>
              {!emailSent && (
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-slate-700 dark:text-slate-300">
                    Email Address <sup className="text-red-500">*</sup>
                  </p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full rounded-[0.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-[12px] text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </label>
              )}

              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] bg-blue-600 hover:bg-blue-700 py-[12px] px-[12px] font-medium text-white transition-colors duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                {!emailSent ? "Submit" : "Resend Email"}
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

export default ForgotPassword
