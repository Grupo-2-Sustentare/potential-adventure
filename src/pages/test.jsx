import styles from "./test.module.css"
import Button from "../components/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

export default function Teste (){
    // const [opcoes, setOpcoes] = useState([])
    // console.log(opcoes)
    // return (
    //     <div style={{width: '300px'}}>
    //         {opcoes.map((o)=>{
    //             return <p key={o.nome}>
    //                 {o.nome}: {o.selecionado ? "true" : "false"}
    //             </p>
    //         })}
    //         <CheckableList getOpcoes={setOpcoes}/>
    //     </div>
    // );

    const [modalAberta, setModalAberta] = useState()
    const [classesModal, setClassesModal] = useState()

    return (
        <div className={styles.tela}>
            <img src={"https://aventurasnahistoria.com.br/media/_versions/curiosidades/alegria_windows_xp_widelg.jpg"}/>
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNul-Co0MI0DazAW6EC11H75u58rLIu4uMrw&s"}/>
            <img src={"https://tecnologiaegestao.wordpress.com/wp-content/uploads/2010/11/113.png"}/>
            <div className={styles.containerModal}>
                <div className={styles.modal}>
                    <span className={styles.iconeFechar}>
                        <FontAwesomeIcon icon={"x"} onClick={() => alert("Sumiu!")}/>
                    </span>
                    <Button insideText={"Olá, Alê!"}/>
                </div>
            </div>
        </div>
    )
}