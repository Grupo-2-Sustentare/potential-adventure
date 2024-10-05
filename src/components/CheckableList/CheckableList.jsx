import styles from './checkableList.module.css';
import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CheckableList({textoBase = "Selecione opções", opcoes = ["Opções", "de", "teste"], teste, setTeste}) {
    // Convertendo a lista de opções (strings) enviadas em uma lista de dicts, com uma chave com
    // o nome do dict e outra informando se essa opção está selecionada ou não.
    opcoes = opcoes.map((o)=>({"nome": o, "selecionado": false}))

    let infoSemDados = opcoes.length === 0

    // Hook de referência. Recebe um dict, onde cada chave será um valor da lista de opções.
    const ref = useRef({})

    // useState e variável de classe dinâmica para controlar a abertura ou não do menu.
    const [expandido, setExpandido] = useState(false);
    let classeExpandido = expandido ? styles.expandido : ""

    function selecionarOpcao(o){

        console.log("Ta chegando aqui", o)
        let checkbox = ref.current[o].children[0]
        checkbox.classList.toggle(styles.selecionado);

        for (let i in opcoes){
            if (opcoes[i].nome === o){
                opcoes[i].selecionado = !opcoes[i].selecionado
                break
            }
        }
        setTeste(opcoes)
    }

    return(
        <div className={styles.checkableList + " " + classeExpandido}>
            <span onClick={()=>setExpandido(!expandido)}>
                {textoBase}
                <FontAwesomeIcon icon={"chevron-down"}/>
            </span>
            <div className={styles.opcoes}>
                {infoSemDados && (<span>Sem dados</span>)}
                {/*Mapeamos um span para cada opção informada*/}
                {opcoes.map((o) =>{
                    // Apesar de termos transformado as opções enviadas (lista de strings) em
                    // uma lista de dicts, na criação do elemento apenas o nome é relevante.
                    o = o.nome
                    return (
                        <span
                            key={o}
                            onClick={()=>selecionarOpcao(o)}
                            // Cria no hook de ref um valor para o elemento criando, identificado
                            // por uma chave que é seu nome.
                            ref={e=>ref.current[o] = e}>
                            <span className={styles.checkbox}>
                                <FontAwesomeIcon icon={"check"}/>
                            </span>
                            <p>{o}</p>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}