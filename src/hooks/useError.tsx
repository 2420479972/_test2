import  { useContext } from "react";
import ErrorContext from "../contexts/ErrorContext";

export const useError = () => useContext(ErrorContext);