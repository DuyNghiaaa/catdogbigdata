"use client";
import { useState } from 'react';
import axios, {AxiosError } from 'axios';
import { Button, Image, Box, Heading, Flex } from '@chakra-ui/react';
import Header from './header';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>('');  // Khai báo biến trạng thái cho URL hình ảnh

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    // Tạo URL cho hình ảnh đã chọn
    if (selectedFile) {
      setImageURL(URL.createObjectURL(selectedFile));
    } else {
      setImageURL('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLabel(response.data.label);
    } catch (error) {
  const axiosError = error as AxiosError; // ép kiểu cho error
  console.error('Có lỗi xảy ra:', axiosError.response?.data || axiosError.message || axiosError);
  setLabel('Có lỗi xảy ra trong quá trình dự đoán');
    }
    
  };

  return (
    <>
    <Header/>
    <Box textAlign="center" margin="50px">
      <Heading marginBottom={"30px"} color={"teal.500"}>Cat Dog classification</Heading>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <br />
        <Button type="submit" colorScheme='teal' size='md' marginTop={"10px"}>Dự Đoán</Button>
      </form>
      
      {imageURL && (
       <Flex justifyContent="center" marginTop="20px">
         <Box textAlign={"center"}>
          <Heading size="md" marginBottom={"30px"}>Hình ảnh đã tải lên:</Heading>
          <Image src={imageURL} alt="Uploaded" boxSize="300px" objectFit="cover" borderRadius="10px" />
        </Box>
       </Flex>
      )}

      {label && <Heading size="lg">This is image: {label}</Heading>}
    </Box>
    </>
  );
};

export default Home;
