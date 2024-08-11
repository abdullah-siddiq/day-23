import './App.css';
import { useState } from 'react';
import Card from './card';
import Header from './components/Header';
import Footer from './components/Footer';
 


function App() {
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [actionButtonText, setActionButtonText] = useState('Add ToDo');
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardDetails, setCardDetails] = useState([]);
  const [filterSelect, setFilterSelect] = useState('All');

  const handleActionButtonClick = () => {
    if (actionButtonText === 'Add ToDo') {
      addTodo();
    } else if (actionButtonText === 'Update ToDo') {
      updateTodo();
    }
  };

  const addTodo = () => {
    const newTodo = {
      TodoName: todoName,
      TodoDescription: todoDescription,
      id: Date.now(),
      status: 'Not Completed',
    };
    setCardDetails([...cardDetails, newTodo]);
    resetForm();
  };

  const updateTodo = () => {
    const updatedCards = cardDetails.map(card =>
      card.id === editingCardId ? { ...card, TodoName: todoName, TodoDescription: todoDescription } : card
    );
    setCardDetails(updatedCards);
    resetForm();
  };

  const resetForm = () => {
    setTodoName('');
    setTodoDescription('');
    setActionButtonText('Add ToDo');
    setEditingCardId(null);
  };

  const handleCardUpdate = (name, description, id) => {
    setActionButtonText('Update ToDo');
    setTodoName(name);
    setTodoDescription(description);
    setEditingCardId(id);
  };

  const handleCardDelete = id => {
    const updatedCards = cardDetails.filter(card => card.id !== id);
    setCardDetails(updatedCards);
  };

  const handleFilterChange = (status, id) => {
    const updatedCards = cardDetails.map(card =>
      card.id === id ? { ...card, status } : card
    );
    setCardDetails(updatedCards);
  };

  const filteredCards = cardDetails.filter(card => {
    if (filterSelect === 'All') return true;
    return card.status === filterSelect;
  });

  return (
    <div className='app'>
      <Header />
      <div className='container'>
        <div className='title-container'>
          <h1>My ToDo Page 😎</h1>
        </div>
        <form className='todo-form'>
          <div className="form-group">
            <label htmlFor="ToDoName" className="form-label">ToDo Name</label>
            <input
              type="text"
              className="form-control"
              id="ToDoName"
              placeholder='ToDo Name'
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ToDoDescription" className="form-label">ToDo Description</label>
            <input
              type="text"
              className="form-control"
              id="ToDoDescription"
              placeholder="ToDo Description"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              disabled={!todoName || !todoDescription}
              className={`btn ${actionButtonText === 'Add ToDo' ? 'btn-success' : 'btn-primary'}`}
              onClick={handleActionButtonClick}
            >
              {actionButtonText}
            </button>
          </div>
        </form>
        <div className='filter-container'>
          <div className='filter-label'>
            <label htmlFor="dropDown">Status Filter: </label>
          </div>
          <div className="dropdown">
            <button
              className={`btn dropdown-toggle ${filterSelect === 'All' ? 'btn-primary' : filterSelect === 'Completed' ? 'btn-success' : 'btn-danger'}`}
              type="button"
              id="dropDown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {filterSelect}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropDown">
              <li>
                <button className="dropdown-item btn-primary" type="button" onClick={() => setFilterSelect('All')}>
                  All
                </button>
              </li>
              <li>
                <button className="dropdown-item btn-success" type="button" onClick={() => setFilterSelect('Completed')}>
                  Completed
                </button>
              </li>
              <li>
                <button className="dropdown-item btn-danger" type="button" onClick={() => setFilterSelect('Not Completed')}>
                  Not Completed
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='todo-cards'>
          {filteredCards.length === 0 ? (
            <h3 className='no-todo-message'>ToDo is Empty 😁.</h3>
          ) : (
            filteredCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                cardUpdate={handleCardUpdate}
                cardDelete={handleCardDelete}
                filterChange={handleFilterChange}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
