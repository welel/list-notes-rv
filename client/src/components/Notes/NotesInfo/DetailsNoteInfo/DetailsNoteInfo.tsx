import { Grid, Divider, Box, LinearProgress, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useAuth } from '../../../../context/AuthContext'
import { DetailsNote } from '../../../../models/Notes/DetailsNote'
import { NotesService } from '../../../../services/Notes/NotesService'
import styles from '../NotesInfo.module.css'

const DetailsNoteInfo = (props: any) => {

    const { isUserLoggedIn, currentUser, setCurrentUser } = useAuth();
    const service: NotesService = new NotesService();
    const [note, setNote] = useState<DetailsNote>(new DetailsNote());
    const [noteTitle, setNoteTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const CreateNote = async () => {
        setLoadingBtn(true);
        setTimeout(() => {
            setLoadingBtn(false);
        }, 3600);
    }

    const GetCurrentNote = async () => {
        var data = {
            note: props.currentNote
        }
        var user = {
            token: currentUser?.token
        }
        setLoading(true);
        await service.DetailsNote(data, user)
            .then(response => {
                setNote(response.obj);
                setNoteTitle(response.obj.title);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    }

    useEffect(() => {
        GetCurrentNote();
    }, [props.currentNote]);

    return (
        <div className={styles.noteMain}>
            {loading === true ?
                <Box style={{ width: '100%', marginTop: '25px' }}>
                    <LinearProgress style={{ backgroundColor: '#202020', color: 'red' }} />
                </Box>
                :
                <>
                    <div className={styles.noteHeader}>
                        <span>Editar - {noteTitle}</span>
                        <span className={styles.noteHeaderIcon}><AiOutlineClose onClick={() => {props.setEditNote(false);props.setCurrentNote("")}} /></span>
                    </div>
                    <div className={styles.noteContent}>
                        <div className={styles.noteItem}>
                            <span>Título: </span>
                            <input disabled={edit === true ? false : true} type="text" defaultValue={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Título" />
                        </div>
                        <div className={styles.noteItem}>
                            <span>Descrição: </span>
                            <textarea disabled={edit === true ? false : true} placeholder='Descrição' defaultValue={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })}>

                            </textarea>
                        </div>
                        <div className={styles.noteItem}></div>
                    </div>
                    <div className={styles.noteButtons}>
                        {edit === true ?
                            <>
                                {loadingBtn === true ?
                                    <span className={styles.noteBtn}><CircularProgress
                                        size={30}
                                        thickness={3}
                                    /></span>
                                    : <button className={styles.noteBtn} onClick={() => { CreateNote() }}>Guardar</button>}
                                <button className={styles.noteBtnCancel} onClick={() => setEdit(false)}>Cancelar</button>
                            </>
                            : <button className={styles.noteBtn} onClick={() => setEdit(true)}>Editar</button>}

                    </div>
                </>
            }
        </div>
    )
}

export default DetailsNoteInfo