import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../services/apiUser";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginToken } from "../hooks/userReducer";
import Loader from "../components/Loader";

function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      toast.success(data.message);
      dispatch(loginToken(data.data.token));
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    data.fullName = data.firstName + " " + data.lastName;
    console.log(data);
    if (data.password != data.confirmPassword) {
      toast.error("please confirm your password");
      return;
    }
    mutate(data);
    reset();
  }
  // if (isLoading) return <Loader />;

  return (
    <>
      <div className="h-screen overflow-auto">
        <div className="m-auto my-28 w-[90%] sm:w-[80%] max-w-[600px] rounded-3xl border border-stone-300 px-4 sm:px-10 py-12 shadow-sm">
          <div className="flex justify-center">
            <Logo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="flex items-center justify-start gap-2 md:gap-4">
              <div className="mt-4 flex w-full flex-col items-start justify-start gap-1">
                <label className="font-semibold" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="input w-full"
                  placeholder="Enter First Name"
                  {...register("firstName")}
                  required
                />
              </div>
              <div className="mt-4 flex w-full flex-col items-start justify-start gap-1">
                <label className="font-semibold" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="input w-full"
                  placeholder="Enter Last Name"
                  {...register("lastName")}
                  required
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input w-full"
                placeholder="Enter Email"
                {...register("email")}
                required
              />
            </div>
            <div className="mt-8 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input w-full"
                placeholder="At Least 6 Characters"
                {...register("password")}
                required
                minLength={6}
              />
            </div>
            <div className="mt-8 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="input w-full"
                placeholder=""
                {...register("confirmPassword")}
                required
                minLength={6}
              />
            </div>
            <p className="mt-4 text-xs text-stone-700">
              By continuing, you agree to Furniro Conditions of Use and Privacy
              Notice.
            </p>
            <div className="text-center">
              <button className="button mt-6">Continue</button>
            </div>
            <div className="mt-4 text-xs font-semibold">
              Already have an account?
              <Link to="/users/login" className="text-blue-600">
                {" "}
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signup;
