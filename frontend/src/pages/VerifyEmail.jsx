import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import Loading from './../components/common/Loading';


function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword, } = signupData;

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-slate-50 dark:bg-[#000814] transition-colors duration-500">
      {
        loading ? <Loading />
          :
          (
            <div className="max-w-[500px] p-4 lg:p-8 bg-white dark:bg-transparent rounded-xl shadow-md dark:shadow-none border border-slate-100 dark:border-transparent mt-8 mb-8">
              <h1 className="text-slate-900 dark:text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] transition-colors duration-500">Verify Email</h1>

              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-slate-600 dark:text-richblack-100 transition-colors duration-500">
                A verification code has been sent to you. Enter the code below
              </p>

              <form onSubmit={handleVerifyAndSignup}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      className="w-[48px] lg:w-[60px] border border-slate-300 dark:border-0 bg-white dark:bg-richblack-800 rounded-[0.5rem] text-slate-900 dark:text-richblack-5 aspect-square text-center focus:outline-2 focus:outline-blue-500 dark:focus:outline-yellow-50 transition-colors duration-500 dark:shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)] text-lg font-semibold"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-yellow-50 dark:hover:bg-yellow-100 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white dark:text-richblack-900 transition-colors duration-300 shadow-sm"
                >
                  Verify Email
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <Link to="/signup">
                  <p className="text-slate-700 dark:text-richblack-5 hover:text-blue-600 dark:hover:text-richblack-200 transition-colors duration-300 flex items-center gap-x-2 font-medium">
                    <BiArrowBack /> Back To Signup
                  </p>
                </Link>

                <button
                  className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-100 dark:hover:text-blue-200 transition-colors duration-300 gap-x-2 font-medium"
                  onClick={() => dispatch(sendOtp(signupData.email, navigate), setOtp(''))}
                >
                  <RxCountdownTimer size={18} />
                  Resend it
                </button>
              </div>
            </div>
          )}
    </div>
  );
}

export default VerifyEmail;