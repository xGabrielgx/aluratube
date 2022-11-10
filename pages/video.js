import React from "react"
import { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import styled from "styled-components";

const StyledVideo = styled.div`
    .button {
        border-radius: 10px;

    }

`

export default function Video() {
    const contexto = React.useContext(ColorModeContext);
    return (
        <StyledVideo>
            Vídeo!
            {contexto.mode}
            <button className="button" onClick={() => {contexto.toggleMode()}}>
                Trocar modo
            </button>
        </StyledVideo>
    )
}