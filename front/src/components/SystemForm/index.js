import React from "react";
import styles from "./index.module.css";
import VoltarButton from "../VoltarButton";

function SystemForm() {
    return(
        <div className={styles.page}>
            <div className={styles.voltar}>
                < VoltarButton />
            </div>
            
            <div className={styles.container}>
                <div className={styles.titulo}>
                    <h1> O Sistema</h1>
                </div>
                <div>
                    <h6>
                    Bem-vindo ao site dedicado à gestão do Hospital Universitário Veterinário &#40;HVU&#41; da Universidade Federal do Agreste de Pernambuco &#40;UFAPE&#41;.
                    </h6> 

                    <h6>
                    O sistema realiza o agendamento por tutores de animais que necessitem de atendimento nas diversas especialidades médico-veterinárias oferecidas no HVU. 
                    Além disso, ele gerencia os históricos de consultas, exames, cirurgias e tratamentos, simplificando o acesso aos dados de saúde do animal na ocasião de 
                    uma nova consulta e novos exames. Assim, a plataforma de gestão do HVU oferece uma interface clara e transparente ao usuário, a fim de contribuir para 
                    uma maior rapidez e eficiência no atendimento.
                    </h6>

                </div>
            </div>
        </div>
    );
}

export default SystemForm;
