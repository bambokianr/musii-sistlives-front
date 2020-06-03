import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #78e5d5; 
`;

const dragReject = css`
  border-color: #e57878; 
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1.5px dashed #ddd;
  border-radius: 8px;
  height: 42px;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors = {
  default: '#7b7b7b',
  success: '#78e5d5',
  error: '#e57878'

}

export const UploadMessage = styled.p`
  display: flex;
  margin-top: 3px;
  color: ${props => messageColors[props.type || 'default']};
`;
