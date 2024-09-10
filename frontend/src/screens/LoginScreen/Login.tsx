import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../features/store";
import { useDispatch } from "react-redux";
import { AuthDto } from "../../features/user/types/dtos/AuthDto";
import { login } from "../../features/user/asyncThunks";

export default function LoginScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  let onSubmitLogin = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const authDto: AuthDto = {
      email: form.email.value,
      password: form.password.value,
    };
    // Dispatch the login action and navigate to the home page if success
    dispatch(login(authDto))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <div className="bg-blue-600 h-full lg:w-5/12 hidden lg:block">
        <div className="w-full h-full px-5 p-3 flex items-center justify-center">
          <div className="text-center text-white px-2 pb-12">
            <h2 className="font-bold text-4xl mb-5">
              {t("Already have an account ?")}
            </h2>
            <p className="mb-8">
              {t(
                "Login to access your personal space and securely upload your files in PDF or JPEG format"
              )}
            </p>
            <div className="flex justify-center mb-3">
              <button
                type="submit"
                className="bg-white text-blue-600 px-4 py-2 w-full rounded-md hover:bg-gray-100 transition"
                onClick={() => navigate("/register")}
              >
                {t("Signup")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full lg:w-7/12 h-full flex items-center justify-center">
        <div className="w-full sm:p-5 md:p-16 lg:p-24 p-3">
          <div className="text-center px-2 pb-12">
            <h2 className="font-bold text-4xl">{t("Login to your account")}</h2>
          </div>
          <form onSubmit={onSubmitLogin}>
            <div className="mb-3">
              <input
                type="email"
                placeholder={t("Email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-describedby="emailHelp"
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                placeholder={t("Password")}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                required
              />
            </div>
            <div className="flex justify-start mb-3">
              <p className="text-blue-500 cursor-pointer">
                {t("Forgot password !")}
              </p>
            </div>
            <div className="flex justify-center mb-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-500 transition"
              >
                {t("Login")}
              </button>
            </div>
            <div className="flex justify-center mb-3 lg:hidden">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-500 transition"
                onClick={() => navigate("/register")}
              >
                {t("Signup")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
