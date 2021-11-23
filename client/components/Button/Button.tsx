import React, { Children, useEffect, useState } from 'react';
import style from './style/Button.module.css';

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined,
  buttonType: "danger" | "success" | "primary" | undefined
}
const getClass = (type: string | undefined) => `${style.btn} ${style[type ? "btn-" + type : "btn-primary"]}`

const Button = (props: ButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  const {children, buttonType, ...p} = props;
  const [nameOfClass, setNameOfClass] = useState(style.btn)

  useEffect(() => {
    setNameOfClass(getClass(buttonType))
  }, [])
  return (
    <button
      {... p}
      className={nameOfClass}>
        {children}
    </button>
  );
};

export default Button;