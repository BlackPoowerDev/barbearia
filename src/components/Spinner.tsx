import { Loader } from "lucide-react";
const Spinner = () => {
  return (
    <div className="absolute w-full h-full bg-black flex justify-center items-center">
      <Loader className="mr-2 h-5 w-5 animate-spin" />
    </div>
  );
};

export default Spinner;
