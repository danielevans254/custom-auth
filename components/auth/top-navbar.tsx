import Logo from "./logo";
import UserButton from "./user-button";

export const TopNavbar = () => {
  return (
    <div className="bg-red-500 w-full z-10 sticky py-2 px-8">
      <div className="flex justify-between items-center">
        <Logo />
        <UserButton />
      </div>
    </div>
  );
};

export default TopNavbar;