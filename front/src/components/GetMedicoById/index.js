import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "./index.module.css";
import VoltarButton from "../VoltarButton";
import { getMedicoById } from '../../../services/medicoService';
import { VisualizarAgendaWhiteButton } from '../WhiteButton';
import { EditarWhiteButton } from '../WhiteButton';

function GetMedicoById() {
    const router = useRouter();
    const { id } = router.query;
    const [medico, setMedico] = useState({});
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            const storedRoles = JSON.parse(localStorage.getItem('roles'));
            setToken(storedToken || "");
            setRoles(storedRoles || []);
        }
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const medicoData = await getMedicoById(id);
                    setMedico(medicoData);
                } catch (error) {
                    console.error('Erro ao buscar veterinários(as):', error);
                } finally {
                    setLoading(false); // Marcar como carregado após buscar os dados
                }
            };
            fetchData();
        }
    }, [id]);

    // Verifica se os dados estão carregando
    if (loading) {
        return <div>Carregando dados do usuário...</div>;
    }

    // Verifica se o usuário tem permissão
    if (!roles.includes("secretario")) {
        return (
            <div className={styles.container}>
                <h3 className={styles.message}>Acesso negado: Você não tem permissão para acessar esta página.</h3>
            </div>
        );
    }

    if (!token) {
        return (
            <div className={styles.container}>
                <h3 className={styles.message}>Acesso negado: Faça login para acessar esta página.</h3>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            < VoltarButton />
            <h1>Informações do&#40;a&#41; veterinário&#40;a&#41;</h1> 
            
            <div className={styles.container_box}>
                <ul>
                    {medico && (
                    <div className={styles.list_container}>
                        <li key={medico.id} className={styles.list_box}>
                            <div className={styles.tutor}>
                                <div className={styles.item_box}>
                                    <h6>Nome</h6>
                                    <h4 className={styles.medico_nome}>{medico.nome}</h4>
                                </div>

                                <div className={styles.item_container}> 
                                    <div className={styles.item_box}>
                                        <h6>E-mail</h6>
                                        <div>{medico.email}</div>
                                    </div>
                                    <div className={styles.item_box}>
                                        <h6>Telefone</h6>
                                        <div>{medico.telefone}</div>
                                    </div>
                                </div>

                                <div className={styles.item_container}> 
                                    <div className={styles.item_box}>
                                        <h6>CPF</h6>
                                        <div>{medico.cpf}</div>
                                    </div>
                                    <div className={styles.item_box}>
                                        <h6>CRMV</h6>
                                        <div>{medico.crmv}</div>
                                    </div>
                                </div>
                                <div className={styles.item_container}> 
                                    <div className={styles.item_box}>
                                        <h6>Especialidade</h6>
                                        <div>
                                            {medico.especialidade && medico.especialidade.map((especialidade, index) => (
                                                <span key={index}>
                                                    {especialidade.nome}
                                                    {index !== medico.especialidade.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className={styles.title_endereco}>Endereço</div> 

                            {medico.endereco && (
                                <div className={styles.tutor}>
                                    <div className={styles.item_container}> 
                                        <div  className={styles.item_box}>
                                            <h6>Rua</h6>
                                            <div>{medico.endereco.rua}</div>
                                        </div>
                                        <div className={styles.item_box}>
                                            <h6>Bairro</h6>
                                            <div>{medico.endereco.bairro}</div>
                                        </div>
                                    </div>

                                    <div className={styles.item_container}> 
                                        <div className={styles.item_box}>
                                            <h6>Número</h6>
                                            <div>{medico.endereco.numero}</div>
                                        </div>
                                        <div className={styles.item_box}>
                                            <h6>Estado</h6>
                                            <div>{medico.endereco.estado}</div>
                                        </div>
                                    </div>

                                    <div className={styles.item_container}> 
                                        <div className={styles.item_box}>
                                            <h6>CEP</h6>
                                            <div>{medico.endereco.cep}</div>
                                        </div>
                                        <div className={styles.item_box}>
                                            <h6>Cidade</h6>
                                            <div>{medico.endereco.cidade}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    </div>
                    )}
                </ul>
                <div className={styles.button_container}>
                    <EditarWhiteButton page={"updateMedico"} id={medico.id}/>
                    <VisualizarAgendaWhiteButton id={parseInt(medico.id)}/>
                </div>
            </div>
        </div>
    );
}

export default GetMedicoById;
