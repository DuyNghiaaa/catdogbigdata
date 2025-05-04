import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Định nghĩa keyframes cho mèo chạy từ trái qua phải
const runLeftToRight = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(calc(100vw - 50px)); }
  100% { transform: translateX(0); }
`;

// Định nghĩa keyframes cho chó chạy từ phải qua trái
const runRightToLeft = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(calc(-100vw + 50px)); }
  100% { transform: translateX(0); }
`;

const Header = () => {
  return (
    <Box position="relative" textAlign="left" padding="20px" bg="teal.500">
      <Heading color="white">Deep Learning Project</Heading>
      
      <Text 
        fontSize="2xl" 
        position="absolute" 
        top="20px" 
        left="0"
        animation={`${runLeftToRight} 20s linear infinite`}
      >
        🐱🐱
        🐱🐱
      </Text>
      
      <Text 
        fontSize="2xl" 
        position="absolute" 
        top="20px" 
        right="0"
        animation={`${runRightToLeft} 20s linear infinite`}
      >
        🐶
        🐶
        🐶
        🐶
      </Text>
    </Box>
  );
};

export default Header;
