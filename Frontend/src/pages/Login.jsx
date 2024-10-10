import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginToken } from "../hooks/userReducer";
import { login } from "../services/apiUser";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: login,
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
    mutate(data);
    reset();
  }
  return (
    <>
      <div className="h-screen overflow-auto">
        <div className="m-auto my-28 w-[90%] sm:w-[80%] max-w-[600px] rounded-3xl border border-stone-300 px-4 sm:px-10 py-12 shadow-sm">
          <div className="flex justify-center">
            <Logo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mt-4 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="eamil">
                Email
              </label>
              <input
                id="eamil"
                type="text"
                className="input w-full"
                placeholder="Enter Email"
                {...register("email")}
                required
              />
            </div>
            <div className="mt-8 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="password">
                Passoword
              </label>
              <input
                id="password"
                type="text"
                className="input w-full"
                placeholder="Enter Password"
                {...register("password")}
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
            <Link
              to="/users/signup"
              className="mt-4 text-xs font-semibold text-blue-600"
            >
              Create New Account?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
