import styled, { css } from 'styled-components';
import background from '../../assets/background.png';

const validInput = css`
  border-color: #78e5d5 !important; 
`;

const invalidInput = css`
  border-color: #e57878 !important; 
`;

export const ImageBackground = styled.div`
  background: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  height: 100%;
`; 

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: flex-end;

  img {
    width: 50px;
    margin: 12px;
  }
`;

export const Content = styled.div`
  background: #FFF;
  margin: 20px 0;
  border-radius: 6px;
  padding: 18px 30px 30px;

  h3 {
    font-size: 32px;
    font-weight: 600;
    color: #5e076d;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form label {
    padding: 0 0 4px 16px;
    color: #5e076d;
    font-size: 17px;
  }
`;

export const Input = styled.input`
  background: transparent;
  ${props => props.validInput === true && validInput};
  ${props => props.validInput === false && invalidInput};
`;

export const Select = styled.select`
  background: transparent;
  ${props => props.validInput === true && validInput};
  ${props => props.validInput === false && invalidInput};
`;

export const DatePickerBox = styled.div`
  margin-bottom: 20px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  height: 42px;
  ${props => props.validInput === true && validInput};

  .react-datepicker__day--selected,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background-color: #5e076d;
  }

  .react-datepicker-wrapper .react-datepicker__input-container input {
    border-color: transparent;
    margin-top: -2px;
  }
`;

export const DescriptionInput = styled.span`
  margin: -6px 4px 12px;
  font-size: 14px;
  line-height: 1.2em;

  span {
    color: #5e076d;
  }
`;

export const SubmitButton = styled.button`
  border: 0;
  border-radius: 8px;
  width: 30%;
  height: 42px;
  padding: 0 20px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;  
  background: #5e076d;
  color: #fff;
  cursor: pointer;

  &:hover, &:focus {
    background: ${props => props.disabled === false && '#50066C'};
  }
`;