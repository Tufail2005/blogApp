import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
export const Signin = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 min-h-screen">
      {/* Left Section - Auth */}
      <div className="flex justify-center items-center">
        <Auth type="signin" />
      </div>

      {/* Right Section - Quote (hidden on small) */}
      <div className="bg-slate-200 hidden md:flex items-center justify-center">
        <Quote />
      </div>
    </div>
  );
};
