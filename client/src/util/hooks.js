import { useState } from "react";

export const useForm = (callBack, initialState = {}) => {
  const onChange = (e) => {
    const [values, setValues] = useState(initialState);

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callBack();
    //? Ta fukcja nie jest nigdzie zapisana, po prostu jest w [ ] w useMutation
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
