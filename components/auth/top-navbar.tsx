import Logo from "./logo";
import UserButton from "./user-button";

export const TopNavbar = () => {
  return (
    <div className="bg-red-500 sticky py-3 px-16 top-0 w-full z-50">
      <div className="flex justify-between items-center">
        <Logo />
        <UserButton />
      </div>
    </div>
  );
};

export default TopNavbar;