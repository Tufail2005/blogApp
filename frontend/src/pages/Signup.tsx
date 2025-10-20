import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      {/* Left Section - Auth */}
      <div>
        <Auth type="signup" />
      </div>

      {/* Right Section - Quote (hidden on small) */}
      <div className="bg-slate-200 hidden lg:block ">
        <Quote />
      </div>
    </div>
  );
};
