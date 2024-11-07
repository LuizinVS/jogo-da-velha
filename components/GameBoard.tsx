import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';  

interface GameBoardProps {
  board: (string | null)[];  
  onSquarePress: (index: number) => void;  
  winningLine: number[] | null;  
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onSquarePress, winningLine }) => {
  const renderSquare = (index: number) => {
    const isWinningSquare = winningLine ? winningLine.includes(index) : false;

    return (
      <Square
        value={board[index]}
        onPress={() => onSquarePress(index)}
        isWinning={isWinningSquare}  
      />
    );
  };

  return (
    <View style={styles.board}>
      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default GameBoard;
