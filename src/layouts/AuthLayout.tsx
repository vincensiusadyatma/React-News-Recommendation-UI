import type { PropsType } from "../Types/PropsType";

const AuthLayout = ({children}: PropsType) => {
     return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-2xl">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout
