import React, { CSSProperties, useState } from "react";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
interface Styles {
  [key: string]: CSSProperties | Styles;
}
const styles: Styles = {
  MainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    display: "flex",
    width: "300px",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  paragraph: {
    color: "#b0b3b8",
    fontSize: "20px",
  },
  board: {
    display: "grid",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    gridTemplateColumns: "repeat(3, auto)",
  },
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "100px",
    border: "1px solid	#242526",
    cursor: "pointer",
  },
  winningDisplayContainer: {
    display: "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "5rem",
    flexDirection: "column",
  },
  BottomContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "1rem",
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: "80%",
    marginTop: ".5rem",
    height: "40px",
    backgroundColor: "#242526",
    border: "none",
    borderRadius: "5px",
    color: "#b0b3b8",
    letterSpacing: ".1em",
    fontSize: "18px",
    cursor: "pointer",
  },
};

const App = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [score, setScore] = useState<any>({
    display: false,
    currentWinner: "",
    X: "-",
    O: "-",
  });
  const checkWin = () => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  };
  const Cell = ({ index }: any) => {
    return (
      <div
        style={styles.cell}
        className="square"
        onClick={() => {
          handleClick(index);
        }}
      >
        <p style={{ color: "#b0b3b8", fontSize: "60px" }}> {cells[index]}</p>
      </div>
    );
  };
  const handleClick = (i: any) => {
    if (!cells[i]) {
      cells[i] = isX ? "X" : "O";
      setCells([...cells]);
      setIsX(!isX);

      let winner = checkWin();
      if (winner) {
        if (score[winner] != "-") {
          score[winner] += 1;
        } else {
          score[winner] = 1;
        }
        score["display"] = true;
        score["currentWinner"] = winner;
        setScore({ ...score });
      } else if (checkDraw()) {
        score["display"] = true;
        score["currentWinner"] = "Draw";
        setScore({ ...score });
      }
    }
  };
  const checkDraw = () => {
    let bool = true;
    cells.forEach((cell) => {
      if (cell === null) {
        bool = false;
      }
    });
    return bool;
  };
  const getDisplayStyle = () => {
    if (score.display) {
      styles.winningDisplayContainer.display = "flex";
    } else {
      styles.winningDisplayContainer.display = "none";
    }
    return styles.winningDisplayContainer;
  };
  const handleClickPLayAgain = (message: string) => {
    setCells(Array(9).fill(null));
    if (message === "displayMessage") {
      score["display"] = false;
      setScore({ ...score });
    } else if (message == "reset") {
      score["X"] = "-";
      score["O"] = "-";
      setScore({ ...score });
    }
  };
  const displayMessage = () => {
    let temp = score.currentWinner;
    if (temp === "Draw") {
      return (
        <>
          <p style={{ textAlign: "center", color: "#b0b3b8" }}>X O</p>
          <p style={{ textAlign: "center", color: "#b0b3b8" }}>Draw !</p>
        </>
      );
    } else {
      return (
        <>
          <p style={{ textAlign: "center", color: "#b0b3b8" }}>{temp}</p>
          <p style={{ textAlign: "center", color: "#b0b3b8" }}>You Won !</p>
        </>
      );
    }
  };
  return (
    <div style={styles.MainContainer}>
      <div style={styles.heading}>
        <div
          style={{
            display: "flex",
            width: "45%",
            justifyContent: "space-between",
            border: ".2px solid #242526",
            padding: "5px 10px",
            borderBottom: `${isX ? "2px solid #2cb1f4" : ".2px solid #242526"}`,
          }}
        >
          <p
            style={{
              ...styles.paragraph,
              color: `${isX ? "#2cb1f4" : "#b0b3b8"}`,
            }}
          >
            X
          </p>
          <p style={styles.paragraph}>{score.X}</p>
        </div>
        <div
          style={{
            display: "flex",
            width: "45%",
            justifyContent: "space-between",
            border: ".2px solid #242526",
            padding: "5px 10px",
            borderBottom: `${
              !isX ? "2px solid #2cb1f4" : ".2px solid #242526"
            }`,
          }}
        >
          <p
            style={{
              ...styles.paragraph,
              color: `${!isX ? "#2cb1f4" : "#b0b3b8"}`,
            }}
          >
            O
          </p>
          <p style={styles.paragraph}>{score.O}</p>
        </div>
      </div>
      <div style={styles.board}>
        {Array(9)
          .fill(<Cell />)
          .map((cell, index) => (
            <Cell index={index} key={index} />
          ))}
      </div>
      <div style={{ ...getDisplayStyle() }}>
        <div>{displayMessage()}</div>
        <button
          style={{
            ...styles.button,
            width: "200px",
            backgroundColor: "#242526",
          }}
          onClick={() => handleClickPLayAgain("displayMessage")}
        >
          Play again
        </button>
      </div>
      <div style={styles.BottomContainer}>
        <button style={styles.button} onClick={() => handleClickPLayAgain("")}>
          Play again
        </button>
        <button
          style={styles.button}
          onClick={() => handleClickPLayAgain("reset")}
        >
          Reset score
        </button>
      </div>
    </div>
  );
};
export default App;
