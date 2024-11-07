import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, Alert } from 'react-native';
import GameBoard from './components/GameBoard';

const Game: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);  

  const checkWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]              
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] }; 
      }
    }

    if (board.every(cell => cell !== null)) {
      return { winner: 'Draw', line: [] };
    }

    return null;
  };

  const handleSquarePress = (index: number) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      if (result.winner === 'Draw') {
        setWinner('Empate');
      } else {
        setWinner(result.winner);
        setWinningLine(result.line); 
        Alert.alert(`${result.winner} venceu!`);
      }
      setIsGameOver(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsGameOver(false);
    setWinningLine(null); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        {isXNext ? 'Vez do jogador X' : 'Vez do jogador O'}
      </Text>

      <GameBoard 
        board={board} 
        onSquarePress={handleSquarePress} 
        winningLine={winningLine}  
      />

      {winner && (
        <Text style={styles.status}>
          {winner === 'Empate' ? 'Empate!' : `${winner} venceu!`}
        </Text>
      )}

      <Button title="Reiniciar Jogo" onPress={restartGame} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default Game;
