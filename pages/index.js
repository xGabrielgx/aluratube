import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";



function HomePage() {
    const service = videoService();
    // console.log(config.playlists);

    const estilosDaHomePage = {
        //  backgroundColor: "red" 
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    // config.playlists
    // const playlists =  {
    //     "jogos": [],

    // }

    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        service
        .getAllvideos()
        .then((dados) => {
            console.log(dados.data);
            //Forma imutavel
            const novasPlaylists = { ...playlists }
            dados.data.forEach((video) => {
                if (!novasPlaylists[video.playlist]) 
                    novasPlaylists[video.playlist] = [];
                
                novasPlaylists[video.playlist].push(video);
            })
            setPlaylists(novasPlaylists);
        });
    }, []);

    console.log("Playlist pront", playlists);

    return (
        <>

            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} >
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <StyledMenu>
//             <div>
//                 <Logo />
//                 <Search />
//             </div>
//         </StyledMenu>
//     )
// }


// criando um componente no lugar da div só que com style CSS 
const StyledHeader = styled.div`


    background-color: ${({ theme }) => theme.backgroundLevel1};
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    .banner {
        width: 100%;
        margin-top: 80px;
        border-radius: 100%;
    }
`;
const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`
function Header(propriedades) {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...props }) {
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists)
    // for normal é statement
    // Mas react prefere retorno por expressão
    // usar o .map pq transforma de uma coisa para outra 
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                // console.log(playlistName)
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const SearchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(SearchValueNormalized);
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
};



// spa - single page aplication 