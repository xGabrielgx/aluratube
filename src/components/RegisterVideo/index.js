import React from "react";
import { StyledRegisterVideo } from "./styles";

// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initalValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values, 
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initalValues: { titulo: "Frost punk", url: "https://youtube.." }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
    


    /* 
    ## O que precisamos para o form funcionar
    - pegar os dados, que precisam vir do state
        - título
        - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    console.log(formVisivel)
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* {Ternario} sempre vai usar mt no react */}
            {/* Operadores de Curto-Circuito /se ambos forem verdadeiros (true && "oi") (false && "oi")  */}
            {formVisivel ? (
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    console.log(formCadastro.values);

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input placeholder="Título do vídeo"
                        name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                                />
                        <input placeholder="URL"
                        name="url" 
                        value={formCadastro.values.url}
                        onChange={formCadastro.handleChange} 
                            /> 

                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            ) : false}
        </StyledRegisterVideo>
    )
}

    // O que precisamos para abrir o form?
    // [X] Falta o botão para adicionar
    // [X] Modal
    // -> [X] Precisamos controlar o state
    // dentro do modal -> Formuçário em si
