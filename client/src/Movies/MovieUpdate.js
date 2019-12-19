import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function UpdateMovie(props) {
    // console.log(props)
    const [movieEdit, setMovieEdit] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const [newStar, setNewStar] = useState('');
    // console.log('update movie edit', movieEdit);
    let id = props.match.params.id;
    useEffect(() => {
        fetchMovie(id);
    }, [props.match.params.id]);

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // console.log('update movie res', res)
                setMovieEdit(res.data);
            })
            .catch(err => console.log(err.response));
    };

    const changeHandler = e => {
        setMovieEdit({
            ...movieEdit,
            [e.target.name]: e.target.value
        });
    };

    const handleStar = e => {
        // console.log(newStar)
        setNewStar(e.target.value);
    };

    const setStar = str => {
        setMovieEdit({
            ...movieEdit,
            stars: [...movieEdit.stars, str]
        });
        // setNewStar('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(movieEdit);
        setStar(newStar);
        console.log(movieEdit)
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieEdit)
            .then(res => {
                // console.log(res);
                props.history.push(`/`);
            })
            .catch(err => console.log(err.response));
            props.history.push('/')
    };



    return (
        <div>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title' placeholder='enter title' value={movieEdit.title} onChange={changeHandler} />
                <label htmlFor='metascore'>Metascore: </label>
                <input type='number' name='metascore' placeholder={100} value={movieEdit.metascore} onChange={changeHandler} />
                <label htmlFor='director'>Director: </label>
                <input type='text' name='director' placeholder='enter director' value={movieEdit.director} onChange={changeHandler} />
                <label htmlFor='stars'>Actor: </label>
                <input type='text' name='stars' placeholder='enter actor' value={newStar} onChange={handleStar} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}