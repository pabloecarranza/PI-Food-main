import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../redux/actions";
//import Paginates from "../Paginate/Paginates"



export default function SearchBar({ setPopUp2 }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      setPopUp2(() => true);
    } else {
      dispatch(getNameRecipe(name));
      setName(e.target.value);
      setName("");
    }
  }

  const onKeyPress = (event) => {
    //si me  dan enter en el input hago la busqueda jajaj

    if (event.charCode === 13) {
      if (!name) {
        setPopUp2(() => true);
      } else {
        dispatch(getNameRecipe(name, dispatch));
        setName("");
      }
    }
  };

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  return (
    <>
      <div >
        <input
          id="inputsearch"
          className="input"
          type="search"
          value={name}
          placeholder="Search a recipes..."
          onChange={(e) => handleInputChange(e)}
          autoComplete="off"
          onKeyPress={(e) => onKeyPress(e)}
        />

        <button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
          <span >search</span>
        </button>
      </div>
    </>
  );
}
