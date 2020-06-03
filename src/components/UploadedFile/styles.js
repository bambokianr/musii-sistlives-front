import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #605b6d;
  margin: -5px 0 16px;

  div {
    display: flex;
    align-items: center;
  }
  div a {
    margin-top: 10px;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      font-size: 12px;
      color: #7b7b7b;
      line-height: 1.2em;
      margin-top: -2px;

      button {
        margin: 0;
        padding: 0;
        border: 0;
        line-height: 1em;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

export const Preview = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;