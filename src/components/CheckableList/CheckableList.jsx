import styles from './checkableList.module.css';
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CheckableList(
    {
        textoBase = "Selecione opções", opcoes = ["Opções", "de", "teste"], getOpcoes
    }) {
    // Convertendo a lista de opções (strings) enviadas em uma lista de dicts, com uma chave com
    // o nome do dict e outra informando se essa opção está selecionada ou não.
    const [valorOpcoes, setValorOpcoes] = useState([])

    // Hook de referência. Recebe um dict, onde cada chave será um valor da lista de opções.
    const ref = useRef({})

    // useState e variável de classe dinâmica para controlar a abertura ou não do menu.
    const [expandido, setExpandido] = useState(false);
    let classeExpandido = expandido ? styles.expandido : ""

    function expandir(){
        setExpandido(!expandido)
        if (valorOpcoes.length === 0){
            setValorOpcoes(opcoes.map((o)=> {return {"nome": o, "selecionado": false}}))
        }
    }

    function selecionarOpcao(o){
        for (let i in valorOpcoes){
            /* Quando achar uma opção com esse nome no dict */
            if (valorOpcoes[i].nome === o){
                /* Atualiza sua checkbox para o reverso do valor anterior */
                ref.current[o].children[0].classList.toggle(styles.selecionado);

                /* Cria uma novo dict com o mesmo valor do atual. O altera conforme a seleção e o seta no dict antigo.*/
                let novo_dict = valorOpcoes
                novo_dict[i].selecionado = !valorOpcoes[i].selecionado
                setValorOpcoes(novo_dict)
                getOpcoes(novo_dict)
                break
            }
        }
    }

    return(
        <div className={styles.checkableList + " " + classeExpandido}>
            <span onClick={()=>expandir()}>
                {textoBase}
                <FontAwesomeIcon icon={"chevron-down"}/>
            </span>
            <div className={styles.opcoes}>
                {(opcoes.length === 0) && (<span>Sem dados</span>)}
                {/*Mapeamos um span para cada opção informada*/}
                {opcoes.map((o, i) =>{
                    // Apesar de termos transformado as opções enviadas (lista de strings) em
                    // uma lista de dicts, na criação do elemento apenas o nome é relevante.
                    return (
                        <span
                            key={i}
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