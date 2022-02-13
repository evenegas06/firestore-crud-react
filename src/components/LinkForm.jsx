import React, { useState, useEffect } from "react";
import db from '../firebase/firebaseConfig';
import { doc, getDoc, } from "firebase/firestore";

const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        props.addOrEditLink(values);
        setValues({
            ...initialStateValues
        });
    };

    const getLinkById = async (id) => {
        const link = await getDoc(doc(db, "links", id));
        setValues({
            ...link.data()
        });
        console.log(link.data());

    }

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (event) => {
        //console.log(event.target.value);
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(() => {
        if (props.currentId === '') {
            setValues({
                ...initialStateValues
            });
        } else {
            console.log('Editing', props.currentId);
            getLinkById(props.currentId);
        }
    }, [props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="bi bi-link"></i>
                </div>
                <input type="text"
                    className="form-control"
                    placeholder="xD"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="bi bi-pencil-square"></i>
                </div>
                <input type="text"
                    className="form-control"
                    placeholder="website"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
                />
            </div>

            <div className="form-group">
                <textarea name="description"
                    rows="3"
                    className="form-control"
                    placeholder="write a description"
                    onChange={handleInputChange}
                    value={values.description}
                ></textarea>
            </div>

            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>

        </form>
    );
};

export default LinkForm;