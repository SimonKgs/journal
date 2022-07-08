import { useEffect, useMemo, useState } from "react";

//  ejemplos de la data inicial y el formValidations que se deben hacer donde esta el form
// const formData = {
//   displayName: 'simon',
//   email: 'simon@gmail.com',
//   password: 'hola33',
// }

// const formValidations = {
//   email: [ (value) => value.includes('@') && value.includes('.'), 'El correo debe tener @ y .'],
//   password: [ (value) => value.length >= 6, 'El password debe tener 6 caracteres'],
//   displayName: [ (value) => value.length >= 2, 'El nombre debe tener 2 caracteres'],
// }

export const useForm = ( initialValue = {}, formValidations = {} ) => {
  const [formState, setFormState] = useState(initialValue);
  const [formValidation, setFormValidation] = useState({})

  useEffect(() => {
    createValidators()
  }, [ formState ])

  //  para que si cambia el valor del form recargue los nuevos valores
  useEffect(() => {
    setFormState( initialValue )
  }, [initialValue])
  


  //  para comprobar que el form sea valido, un useMemo que dependa de los cambios del formValidation
  //  recorremos cada valor del formValidations y comprobamos is es distinto de null, quiere decir que tendrá el mensaje de error
  //  si tiene error paramos la comprobacion y retornamos el false porque ya no será un formulario valido
  //  de lo contrario cuando acabe de recorrerlo sin errores retornara el true
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys( formValidation ) ) {
      if ( formValidation[formValue] !== null ) return false
    }
    return true
  }, [formValidation])
  

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [ name ]: value,
    });
  };

  const onCleanForm = () => {
    setFormState(initialValue);
  };


  //  creamos un objeto que tendra cada propiedad recibida en el formValidations
  //  extraemos de cada campo del formValidtions, el primer valor que es una funcion que devuelve un boolean y el 2do que es un mensaje de error
  //  por cada campo creamos una nueva propiedad en el checked, que tendrá un null si se cumple la condicion o un mensaje si no se cumple
  //  por ultimo fijamos el objeto creado al setFormValidation y ya lo tendriamos preparado para retornar
  const createValidators = () => {
    const formCheckedValues = {}

    for (const formField of Object.keys( formValidations ) ) {
      const [ fn, errorMessage = 'campo requerido' ] = formValidations[ formField ]

      formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage
    }

    setFormValidation( formCheckedValues )
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onCleanForm,
    ...formValidation,
    isFormValid
  };
};