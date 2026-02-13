import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/Header'
import AppsTasks from './Pages/AppsTasks'
import WidgetsTables from './Pages/WidgetsTables'
import Auth404 from './Pages/Auth404'
import { Modal } from 'bootstrap'

const App = () => {

  const [task, setTask] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem('task')) || [];
    setList(oldList);
  }, [list]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newList = [];
    if (task.id) {
      newList = list.map((item) => {
        if (item.id == task.id) {
          return task;
        }
        return item;
      })
      setList(newList);
    }
    else {
      newList = [...list, { ...task, id: Date.now() }];
    }
    setList(newList);
    localStorage.setItem('task', JSON.stringify(newList));
    setTask({});
    const modalElement = document.getElementById('addNewTasks');
    const modalInstance = Modal.getInstance(modalElement);
    modalInstance.hide();
  }

  const handleReset = () => {
    setTask({})
  }

  const handleDelete = (id) => {
    let newList = list.filter(item => item.id != id);
    setList(newList);
    localStorage.setItem('task', JSON.stringify(newList));
  }

  const handleEdit = (id) => {
    let data = list.find(item => item.id == id);
    setTask(data);
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/appsTasks' element={<AppsTasks task={task} list={list} handleChange={handleChange} handleSubmit={handleSubmit} handleReset={handleReset} handleDelete={handleDelete} handleEdit={handleEdit} />} />
        <Route path='/widgetsTables' element={<WidgetsTables />} />
        <Route path='*' element={<Auth404 />} />
      </Routes>
    </>
  )
}

export default App
