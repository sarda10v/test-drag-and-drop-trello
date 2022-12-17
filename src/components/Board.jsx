import React, { useState } from "react";
import styles from "./Board.module.scss";

const Board = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "JAVASCRIPT",
      items: [
        {
          id: 1,
          question: "Как проверить, является ли значение массивом?",
          answer: "Через метод Array.isArray!",
        },
        ,
      ],
    },
    {
      id: 2,
      title: "REACT",
      items: [
        {
          id: 1,
          question: "Что такое пропсы?",
          answer:
            "Props — это входные данные React-компонентов, передаваемые от родительского компонента дочернему компоненту.",
        },
      ],
    },
    {
      id: 3,
      title: "HTML && CSS",
      items: [
        {
          id: 1,
          question: "Разница между div и span?",
          answer:
            "Тег <div> — это блочный элемент, обычно используется для определения какого-то крупного блока на странице - у него свойство display: block, а тег <span> — это строчный элемент, для мелких фразовых элементов - у него свойство display: inline.",
        },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === styles.item) {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  };

  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((i) => {
        if (i.id === board.id) {
          return board;
        }
        if (i.id === currentBoard.id) {
          return currentBoard;
        }
        return i;
      })
    );
  };

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((i) => {
        if (i.id === board.id) {
          return board;
        }
        if (i.id === currentBoard.id) {
          return currentBoard;
        }
        return i;
      })
    );
  };

  return (
    <div className={styles.app}>
      {boards.map((board) => {
        return (
          <div
            className={styles.board}
            key={board.id}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
          >
            <div className={styles.boardTitle}>{board.title}</div>
            {board.items.map((item) => (
              <div
                key={item.id}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                className={styles.item}
              >
                <details>
                  <summary> {item.question}</summary>
                  <p>Ответ: {item.answer}</p>
                </details>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
