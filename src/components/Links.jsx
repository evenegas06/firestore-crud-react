import React, { useEffect, useState } from "react";

import LinkForm from "./LinkForm";
import db from '../firebase/firebaseConfig';
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc  } from "firebase/firestore";
import { toast } from 'react-toastify';

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
        // console.log(linkObject);
        if (currentId === '') {
            await addDoc(collection(db, 'links'),
                linkObject
            );
            toast('Nuevo elemento agregado', {
                type: 'success'
            });
        } else {
            await updateDoc(doc(db, 'links', currentId), linkObject);
        }
    };

    const onDelete = async (id) => {
        if (window.confirm('¿Eliminar?')) {
            await deleteDoc(doc(db, "links", id));
            toast('Elemento eliminado correctamente', {
                type: 'error',
                autoClose: 2000
            });
        }
    };

    const getLinks = () => {
        onSnapshot(collection(db, 'links'), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                const link = doc.data();
                //console.log(link);
                docs.push({
                    ...link,
                    id: doc.id
                });
            });
            setLinks(docs);
        });
    };

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div>
            <div className="col-md-8 p-2">
                <LinkForm {...{
                    addOrEditLink,
                    currentId,
                    links
                }} />
            </div>
            <div className="col-md-8 p-2">
                {links.map((link) => {
                    return (
                        <div className="card mb-1" key={link.id}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h4>{link.name}</h4>
                                    <div>
                                        <i className="bi bi-backspace-fill"
                                            onClick={() =>
                                                onDelete(link.id)
                                            }
                                        ></i>
                                        <i className="bi bi-pencil-square"
                                            onClick={() =>
                                                setCurrentId(link.id)
                                            }
                                        ></i>
                                    </div>
                                </div>
                                <p>{link.description}</p>
                                <p>{link.url}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Links;