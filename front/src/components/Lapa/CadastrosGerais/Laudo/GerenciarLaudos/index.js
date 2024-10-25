import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "./index.module.css";
import SearchBar from '../../../../SearchBar';
import { getAllLaudoNecropsia, deleteLaudoNecropsia } from '../../../../../../services/laudoNecropsiaService';
import VoltarButton from '../../../VoltarButton';
import ExcluirButton from '../../../../ExcluirButton';
import ErrorAlert from "../../../../ErrorAlert";

function GerenciarLaudos() {
    const [laudos, setLaudos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deletedLaudoId, setDeletedLaudoId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const laudosData = await getAllLaudoNecropsia();
                setLaudos(laudosData);
            } catch (error) {
                console.error('Erro ao buscar laudos:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteLaudo = async (laudoId) => {
        try {
            await deleteLaudoNecropsia(laudoId);
            setLaudos(laudos.filter(laudo => laudo.id !== laudoId));
            setDeletedLaudoId(laudoId);
            setShowAlert(true);
        } catch (error) {
            console.error('Erro ao excluir laudo:', error);
            if (error.response && error.response.status === 409) {
                setShowErrorAlert(true);
            }
        }
    };

    const filteredLaudos = laudos.filter(laudo => {
        const codigoPatologia = laudo.fichaSolicitacaoServico?.codigoPatologia || "";
        return codigoPatologia.toLowerCase().includes(searchTerm.toLowerCase()) ||
               laudo.conclusao.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <VoltarButton />
            <h1>Listagem de Laudos</h1>

            <div className={styles.navbar_container}>
                <SearchBar placeholder={`Buscar por código de patologia ou conclusão`} onSearchChange={setSearchTerm} />
                <button className={styles.adicionar_raca_button} onClick={() => router.push(`/lapa/createLaudo`)}>
                    Adicionar Laudo
                </button>
            </div>
 
            {filteredLaudos.length === 0 ? (
                <p className={styles.paragrafo}> Laudo não encontrado.</p>
            ) : (
                <ul className={styles.list}>
                    {filteredLaudos.map(laudo => (
                        <li key={laudo.id} className={styles.info_container}>
                            <div className={styles.info_box}>
                                <h6>Código da Patologia</h6>
                                <p>{laudo.fichaSolicitacaoServico?.codigoPatologia}</p>
                            </div>
                            <div className={styles.button_container}>
                                <button
                                    className={styles.editar_button}
                                    onClick={() => router.push(`/lapa/getLaudoById/${laudo.id}`)}
                                >
                                    Visualizar
                                </button>
                                <ExcluirButton itemId={laudo.id} onDelete={handleDeleteLaudo} /> 
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showAlert && <ErrorAlert message="Laudo excluído com sucesso!" show={showAlert} />}
            {showErrorAlert && <ErrorAlert message="Este laudo não pode ser excluído." show={showErrorAlert} />}
        </div>
    );
}

export default GerenciarLaudos;
