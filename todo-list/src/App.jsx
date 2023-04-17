import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./pages/todo-list/TodoList";
import About from "./pages/about/About";
import { Container } from "./components/container/Container";
import { useState } from "react";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggleClick = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <BrowserRouter>
      <Container
        theme={isDarkTheme ? "dark" : "light"}
        onToggleTheme={handleToggleClick}
      >
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
