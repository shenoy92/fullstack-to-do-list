import React, { useState, useEffect } from 'react';

import styles from '../styles/todo.module.scss';
import Auth from "../common/helper/auth";
import Confirm from '../component/confirm';
import { API_URLS, API_METHODS } from '../common/constants/api';
import { fetchData } from '../common/helper/fetchData';

const Todo = (props) => {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData(API_URLS.todo, API_METHODS.get, null, null)
    .then((response) => {
      setTodoList(response.data);
    })
  },[]);
  

  const handleTodo = (event) => {
    setTodoItem(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(todoItem.length) {
      if(editId) {
        fetchData(`${API_URLS.todo}/${editId}`, API_METHODS.put, { todoItem: todoItem }, null, 'Updated todo item successfully!!')
        .then((response) => {
          setEditId(null);
          setTodoItem('');
          setTodoList(response.data);
        })
      } else {
        fetchData(API_URLS.todo, API_METHODS.post, { todoItem: todoItem }, null, 'Added todo item successfully!!')
        .then((response) => {
          setTodoItem('');
          setTodoList(response.data);
        })
      }
    }
  }

  const handleEdit = (data) => {
    setEditId(data._id);
    setTodoItem(data.todoItem);
  }

  const handleDelete = (id) => {
    setDeleteId(id);
  }

  const handleDeleteConfirm = (confirmStatus) => {
    if(confirmStatus) {
      fetchData(`${API_URLS.todo}/${deleteId}`, API_METHODS.delete, null, null, 'Deleted todo item successfully!!')
      .then((response) => {
        setDeleteId(null);
        setTodoList(response.data);
      })
    } else {
      setDeleteId(null);
    }
  }

    return (
      <div className={styles.todoContainer}>
        <form onSubmit={handleSubmit}>
          <input className="todo-input" placeholder="Todo item" type="text" value={todoItem} onChange={handleTodo}/>
          <button disabled={todoItem.length ? false : true} className="todo-btn" type="submit">{editId ? 'Update' : 'Add' }</button>
        </form>

        <div className={styles.todoListWrapper}>
        { todoList.length > 0 ? <ul>
          { todoList.map((data) => {
              return (<li key={data._id}>
                <p>{data.todoItem}</p>
                <div className={styles.actions}>
                  <button className={styles.edit} onClick={() => handleEdit(data)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(data._id)}>Delete</button>
                </div>
              </li>)
            }) 
          }
        </ul> : <div className={styles.emptyListMsg}>Add a todo item to the list</div>}
        </div>

        { deleteId && <Confirm 
          message={'Are you sure, you want to delete this record?'}
          onConfirm={handleDeleteConfirm}/>}
        <button className={styles.logoutBtn} onClick={
          () => {
            Auth.logout(() => {
              props.history.push('/');
            })
          }
        }>LOGOUT</button>
      </div>
    );
  }
  
  export default Todo;
  