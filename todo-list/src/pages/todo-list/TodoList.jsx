import { useEffect, useRef, useState } from "react";
import styles from "./Styles.module.css";
import { FcCancel } from "react-icons/fc";
import { FaRegEdit, FaRegSave, FaTrashAlt } from "react-icons/fa";
import { BiCircle, BiCheckCircle } from "react-icons/bi";

const TodoList = () => {
  const [list, setList] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newList, setNewList] = useState("");
  const [completed, setCompleted] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTodo, setSelectedTodo] = useState({});
  const [displayGrid, setDisplayGrid] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [storedTasks, setStoredTasks] = useState([]);

  const listRef = useRef(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tarefas");
    if (storedTasks) {
      setStoredTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (storageLoaded) {
      localStorage.setItem("tarefas", JSON.stringify(storedTasks));
    }
    setStorageLoaded(true);
  }, [storedTasks, storageLoaded]);

  useEffect(() => {
    const sortedTasks = storedTasks.sort((a, b) => {
      if (completed.includes(a.key) && !completed.includes(b.key)) {
        return 1;
      }
      if (!completed.includes(a.key) && completed.includes(b.key)) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      return 0;
    });
    setTasks(sortedTasks);
  }, [completed, storedTasks]);

  const handleCreate = (e) => {
    e.preventDefault();

    if (!list.trim()) {
      // verifica se o input está vazio ou apenas com espaços em branco
      return; // para a execução caso esteja vazio
    }

    const newTask = {
      key: Date.now(),
      value: list,
      createdAt: new Date().toISOString(), // adiciona a data de criação atual
    };

    setStoredTasks([...storedTasks, newTask]);
    setList("");

    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" }); // faz a rolagem até o elemento da nova tarefa criada
    }
  };

  const handleCompleteTodo = (key) => {
    if (completed.includes(key)) {
      setCompleted(completed.filter((todoKey) => todoKey !== key));
    } else {
      setCompleted([...completed, key]);
    }
  };

  const handleSelectTodo = (key) => {
    setSelectedTodo(tasks.find((todo) => todo.key === key));
    if (selectedTodo) {
      setSelectedTodo(selectedTodo);
      setList(selectedTodo.value);
      listRef.current = document.getElementById(`todo-${key}`);
    }
  };

  const handleUpdateTodo = (key, newValue) => {
    const updatedTodoIndex = tasks.findIndex((todo) => todo.key === key);

    if (updatedTodoIndex !== -1) {
      const updatedtasks = [...tasks];
      updatedtasks[updatedTodoIndex].value = newValue;
      updatedtasks[updatedTodoIndex].updatedAt = new Date().toISOString(); // adiciona a data de atualização atual
      localStorage.setItem("tarefas", JSON.stringify(updatedtasks)); // atualiza o localStorage
      setTasks(updatedtasks);
      setSelectedTodo({});
      setNewList("");
    }
  };

  function handleRemoveTodo(key) {
    const updatedTasks = tasks.filter((todo) => todo.key !== key);
    localStorage.setItem("tarefas", JSON.stringify(updatedTasks)); // atualiza o localStorage

    setTasks(updatedTasks);
  }

  const handleRemoveCompleted = () => {
    const updatedTasks = tasks.filter((task) => !completed.includes(task.key));
    setTasks(updatedTasks);
    setCompleted([]);
  };

  function handleToggleDisplay() {
    setDisplayGrid(!displayGrid);
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem("tarefas");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (storageLoaded) {
      localStorage.setItem("tarefas", JSON.stringify(tasks));
    }
    setStorageLoaded(true);
  }, [tasks, storageLoaded]);

  return (
    <div className={displayGrid ? styles.grid : styles.form_control}>
      <h1>Criar tarefas</h1>
      <form className={styles.form} onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={list}
          onChange={(e) => setList(e.target.value)}
        />
        <button type="submit" title="Criar tarefa">
          OK
        </button>
      </form>

      {tasks.length > 0 && (
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => handleRemoveCompleted()}
            title="Excluir tarefa riscada"
          >
            Excluir completadas
          </button>
          <button onClick={() => setTasks([])}>Excluir tudo</button>
          <button
            onClick={handleToggleDisplay}
            title={displayGrid ? " Para modo lista" : " Para modo grid"}
          >
            Alternar exibição
          </button>
        </div>
      )}

      <ul className={`${styles.tarefa} `}>
        {tasks ? (
          tasks
            .filter((todo) =>
              todo.value.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((todo) => (
              <div
                className={
                  completed.includes(todo.key) ? styles.list2 : styles.list
                }
                key={todo.key}
                id={`todo-${todo.key}`}
              >
                {selectedTodo.key === todo.key ? (
                  <div className={styles.list_edit}>
                    <input
                      type="text"
                      placeholder="Digite uma nova tarefa..."
                      value={newList}
                      onChange={(e) => setNewList(e.target.value)}
                    />
                    <div className={styles.btns}>
                      <FcCancel
                        className={styles.btn1}
                        onClick={() => setSelectedTodo({})}
                        title="Cancelar"
                      />
                      <FaRegSave
                        className={styles.btn2}
                        onClick={() => handleUpdateTodo(todo.key, newList)}
                        title="Salvar"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span></span>
                    <li
                      title={`${todo.value} Criada em -
                      ${new Date(todo.createdAt).toLocaleString()}`}
                      onClick={() => handleSelectTodo(todo.key)}
                      className={
                        completed.includes(todo.key) ? styles.completed : ""
                      }
                      ref={listRef}
                    >
                      {todo.value}
                    </li>
                    <div className={styles.btns}>
                      {completed.includes(todo.key) ? (
                        ""
                      ) : (
                        <>
                          <FaTrashAlt
                            className={styles.btn1}
                            onClick={() => handleRemoveTodo(todo.key)}
                            title="Excluir"
                          />
                          <FaRegEdit
                            className={styles.btn2}
                            onClick={() => setSelectedTodo(todo)}
                            title="Editar"
                          />
                        </>
                      )}

                      {completed.includes(todo.key) ? (
                        <BiCheckCircle
                          className={styles.btn3}
                          onClick={() => handleCompleteTodo(todo.key)}
                          color="#45dc17"
                          title="Desmarcar tarefa"
                        />
                      ) : (
                        <BiCircle
                          className={styles.btn3}
                          onClick={() => handleCompleteTodo(todo.key)}
                          title="Completar tarefa"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
        ) : (
          <p>Não há tarefas na lista.</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
