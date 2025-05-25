import { words } from "@/config/text";
import NavBar from "../components/NavBar";

const AnAuthorized = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="flex flex-col space-y-10 items-center">
      {!user ? <></>:<NavBar/>}
      <p className="text-8xl text-red-800 mt-32">401!</p>
      <p className="m-4 text-2xl text-white">{words.NotAuthorized}</p>
    </div>
  )
}

export default AnAuthorized
