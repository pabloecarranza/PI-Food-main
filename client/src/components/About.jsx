import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/About.module.css";

function About() {
  let navigate = useNavigate();
  const handleClickss = () => {
    navigate("/home/");
  };

  return (
    <div className={Styles.master}>
      <div className={Styles.center}>
        <div className={Styles.about}>
          Soy Programador FullStack 💻 !<br /> instruido por Bootcamp Soy Henry.
          👩🏼‍💻
          <br />
          Súper intensivo, con más de 800 hs de práctica de código.👩🏼‍🎓
          <br /> <br />
          Aquí aprendí HARD SKILLS como: <br />
          Frontend: React, Redux, 👩🏼‍🏫 <br />
          Backend: Node.JS, Javascript, Express, Sequelize👩🏼‍🏫 <br />
          Data Base: SQLite, PostgreSQL, SQL 👩🏼‍🏫
          <br />
          <br />
          Me encuentro aprendiendo en este momento Typescript && React Native.🕵🏼‍♀️
          <br />
          #StudentModeAlways 📖
          <br />
          <br />
          También tuve el privilegio de fortalecer y/o aprender Soft Skills:{" "}
          <br />
          🔹 Comunicación clara 💬
          <br /> 🔹Trabajo en equipo 🤝
          <br />
          🔹Adaptación al cambio 🌪️ <br />
          🔹Resolución de problemas 🛠️
          <br /> <br />
          Quieres conocerme mejor? <br />
          Te dejo mi contacto: <br />
          Mail: 📬pabloecarranza@gmail.com
          <br />
          Github: 🐱 https://github.com/pabloecarranza
        </div>
        <div className={Styles.img}></div>
      </div>
        <div className={Styles.goback}>
          <button onClick={handleClickss}>Pagina Principal</button>
        </div>
    </div>
  );
}

export default About;
