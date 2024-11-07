import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';  // Importando o componente Square

interface GameBoardProps {
  board: (string | null)[];  // O estado do tabuleiro, um array de 9 células que pode ser X, O ou null
  onSquarePress: (index: number) => void;  // Função que é chamada ao pressionar uma célula
  winningLine: number[] | null;  // Linha vencedora, que contém os índices das células vencedoras
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onSquarePress, winningLine }) => {
  const renderSquare = (index: number) => {
    // Se o índice estiver na linha vencedora, adiciona um estilo especial
    const isWinningSquare = winningLine ? winningLine.includes(index) : false;

    return (
      <Square
        value={board[index]}
        onPress={() => onSquarePress(index)}
        isWinning={isWinningSquare}  // Passando a informação para o Square
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