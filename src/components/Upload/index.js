import React from 'react';
import { DropContainer, UploadMessage } from './styles';
import Dropzone from 'react-dropzone';

function Upload({ onUpload }) {
  function renderDragMessage(isDragActive, isDragReject) {
    if (!isDragActive) {
      return <UploadMessage>arraste um arquivo aqui...</UploadMessage>
    }
    if (isDragReject) {
      return <UploadMessage type="error">arquivo não suportado</UploadMessage>
    }
    return <UploadMessage type="success">solte o arquivo aqui</UploadMessage>
  }

  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
}
export default Upload;