import { useState } from "react";
import doug from "../assets/avatars/Doug.jpg";
import starwars from "../assets/avatars/starwars.jpeg";
import starwars2 from "../assets/avatars/starwars2.webp";
import starwars3 from "../assets/avatars/starwars3.webp";

const avatars = [
  doug, starwars, starwars2, starwars3
 
]

const AvatarSelector = ({ setValue, error }) => {
  const [selected, setSelected] = useState(null)

  const handleSelect = (avatar) => {
    setSelected(avatar)
    setValue("avatar", avatar, { shouldValidate: true })
  };

  return (
    <div>
      <p className="text-white mb-2 font-semibold">Selecciona un avatar:</p>

      <div className="grid grid-cols-4 gap-4">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt="avatar"
            onClick={() => handleSelect(avatar)}
            className={`w-18 h-18 rounded-full cursor-pointer border-3 transition
              ${selected === avatar ? "border-red-500 scale-105" : "border-transparent"}
            `}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  )
}

export default AvatarSelector;
