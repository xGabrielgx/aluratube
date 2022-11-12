import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

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

const PROJECT_URL = "https://ifdmuifsabamwqqlxrmk.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZG11aWZzYWJhbXdxcWx4cm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjI3MjksImV4cCI6MTk4Mzc5ODcyOX0.snv-PICaaoa2KJ9G6JPoTIrhp4C5yyT8S-94vHtIjkg"

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo() {
    const formCadastro = useForm({
        initalValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
    console.log();
    


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

                    // Contrato entre o nosso Front e o BackEnd
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos",
                     })
                     .then((oqueveio) => {
                        console.log(oqueveio);
                     })
                     .catch((err) => {
                        console.log(err);
                     })

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
