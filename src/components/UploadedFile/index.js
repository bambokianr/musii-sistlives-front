import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Container, FileInfo, Preview } from './styles';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

function UploadedFile({ file, onDelete }) {
  return (
    <Container>
      <FileInfo>
        <Preview src={file.preview} /> 
        <div>
          <strong>{file.name}</strong>
          <span>
            {file.readableSize}{" "}
            <button onClick={() => onDelete(file)}>Excluir</button>
          </span>
        </div>
      </FileInfo>
      <div>
        {!file.uploaded && !file.error && (
          <CircularProgressbar 
            styles={{
              root: { width: 24 },
              path: { stroke: '#5e076d' }
            }}
            strokeWidth={14}
            value={file.progress}
          />
        )}
        {file.url && (
          <a 
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
          </a>
        )}
        {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
        {file.error && <MdError size={24} color="#e57878" />}
      </div>
    </Container>
  );
}
export default UploadedFile;