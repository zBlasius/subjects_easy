import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import MyButton from '../../components/Button';
import MyInput from '../../components/Input';

const NewVideo = () => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("");
  const { courseId } = useParams();

  const handleFileChange = (event:any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name || "")
    const sizeInMB = selectedFile.size / (1024 * 1024);
    const finalSize = sizeInMB.toFixed(2);
    setSize(finalSize)
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const _courseId = courseId?.toString() || "";
    formData.append('file', file);
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('StorageUsage', size);
    formData.append('FileName', fileName);
    formData.append('courseId', _courseId);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Arquivo enviado com sucesso!');
      } else { 
        console.error('Erro ao enviar o arquivo:', response.statusText);
      }
    } catch (error:any) {
      console.error('Erro ao enviar o arquivo:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <MyInput onChange={(e)=>setTitle(e.target.value)} label='Título do video' />
      <MyInput onChange={(e)=>setDescription(e.target.value)}  label='Descrição do video' />
      <MyButton label='Enviar Arquivo' onClick={handleUpload}/>
    </div>
  );
};

export default NewVideo;
