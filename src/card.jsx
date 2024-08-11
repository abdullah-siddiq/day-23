import React from 'react';

function Card({ card, cardUpdate, cardDelete, filterChange }) {
    return (
        <div className="card col-md-5 col-lg-3 m-2">
            <div className="card-body">
                <h5 className="card-title">{card.TodoName}</h5>
                <p className="card-text">{card.TodoDescription}</p>
                <button className="btn btn-primary" onClick={() => cardUpdate(card.TodoName, card.TodoDescription, card.id)}>Edit</button>
                <button className="btn btn-danger ms-2" onClick={() => cardDelete(card.id)}>Delete</button>
                <button className="btn btn-success ms-2" onClick={() => filterChange('Completed', card.id)}>Complete</button>
            </div>
        </div>
    );
}

export default Card;
