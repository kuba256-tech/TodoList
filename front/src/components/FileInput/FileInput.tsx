import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface Props {
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const FileInput: React.FC<Props> = ({ onGetFile, name }) => {
  const [fileName, setFileName] = useState('');
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
    onGetFile(e);
  };
  return (
    <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
      {fileName ? fileName.slice(0, 5) + '...' : 'fileName'}
      <VisuallyHiddenInput type="file" multiple name={name} onChange={onFileChange} />
    </Button>
  );
};

export default FileInput;
