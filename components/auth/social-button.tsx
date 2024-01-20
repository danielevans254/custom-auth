import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { SiTwitter } from "react-icons/si";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const SocialButton = () => {
  const buttonClassName = cn("flex items-center justify-center w-full gap-x-2 mx-auto text-center");

  const handleClick = () => {
    console.log("Clicked");
  }
  return (
    <div className="grid grid-cols-2 items-center w-full gap-2">
      <Button variant="secondary" size="sm" className={buttonClassName} onClick={handleClick}>
        <FcGoogle className="text-xl" />
        <span>Google</span>
      </Button>
      <Button variant="secondary" size="sm" className={buttonClassName}>
        <FaGithub className="text-xl" />
        <span>Github</span>
      </Button>
      <Button variant="secondary" size="sm" className={buttonClassName}>
        <SiFacebook className="text-xl" />
        <span>Facebook</span>
      </Button>
      <Button variant="secondary" size="sm" className={buttonClassName}>
        <SiTwitter className="text-xl bg-bl" />
        <span>Twitter</span>
      </Button>
    </div>
  );
}

export default SocialButton;