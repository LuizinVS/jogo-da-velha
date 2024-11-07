import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface SquareProps {
  value: string | null;  
  onPress: () => void;  
  isWinning?: boolean;  
}

const Square: React.FC<SquareProps> = ({ value, onPress, isWinning }) => {
  return (
    <TouchableOpacity style={[styles.square, isWinning && styles.winningSquare]} onPress={onPress}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  winningSquare: {
    backgroundColor: 'red',  
    borderColor: 'green',      
  },
});

export default Square;
