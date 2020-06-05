import React, { useState } from 'react';
import axios from 'axios';
import filesize from 'filesize';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import { ImageBackground, Container, Logo, Content, Input, Select, DescriptionInput, DatePickerBox, SubmitButton } from './styles';
import logo from '../../assets/logo.svg';
import Upload from '../../components/Upload';
import UploadedFile from '../../components/UploadedFile';
import api from '../../services/api';
import { genreList } from '../../utils/constants';
import { isURL, isBase62 } from '../../utils/functions';

registerLocale("pt", pt);

function LivesForm() {
  const [validInput, setValidInput] = useState({});
  const [liveData, setLiveData] = useState({
    artist: '',
    genre: "0",
    date: new Date(),
    url: '',
    spotify_id: '',
    track: '',
  });
  const [uploadedFile, setUploadedFile] = useState({});

  function handleUpload(file) {
    const fileToUpload = file[0];
    const uploadedFile = {
      key: '',
      file: fileToUpload,
      name: fileToUpload.name,
      readableSize: filesize(fileToUpload.size),
      preview: URL.createObjectURL(fileToUpload),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    };
    setUploadedFile(uploadedFile);
    processUpload(uploadedFile);
  }

  function processUpload(uploadedFile) {
    const data = new FormData();
    data.append('file', uploadedFile.file, uploadedFile.name);
    api.post('post', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded  * 100) / e.total));
        setUploadedFile({...uploadedFile, progress});
      }
    }).then(response => {
      setUploadedFile({
        ...uploadedFile,
        uploaded: true,
        key: response.data.key,
        url: response.data.url
      });
      setLiveData({...liveData, thumbnail: response.data.url});
    }).catch(() => {
      setUploadedFile({
        ...uploadedFile,
        error: true
      });
    });
  }

  function handleInput(dataInput, keyInput) {
    let isValidInput = '';
    if (keyInput === 'artist') {
      isValidInput = dataInput.length !== 0;
    } else if (keyInput === 'genre') {
      isValidInput = dataInput !== "0";
    } else if (keyInput === 'url') {
      isValidInput = isURL(dataInput);
    } else if (keyInput === 'spotify_id') {
      var arrayTrackId = dataInput.split(':');
      if (arrayTrackId.length === 3) {
        if (arrayTrackId[0] === 'spotify' && arrayTrackId[1] === 'track') {
          isValidInput = isBase62(arrayTrackId[2]);
        }
      } else { isValidInput = false; }
    } else if (keyInput === 'date') {
      isValidInput = true;
    }

    keyInput === 'spotify_id' ? setLiveData({...liveData, [keyInput]: arrayTrackId[2]}) : setLiveData({...liveData, [keyInput]: dataInput});
    setValidInput({...validInput, [keyInput]: isValidInput});
  }

  async function handleDeleteFile(file) {
    if (file.uploaded) {
      await api.delete(`post/${file.key}`);
      setLiveData({...liveData, thumbnail: null });
    } 
    setUploadedFile({});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { artist, genre, date, url, spotify_id } = validInput;
    if(artist === true && genre === true && date === true && url === true && spotify_id === true && uploadedFile.uploaded) {
      
      await axios.post('https://jhh71gbi7j.execute-api.us-east-2.amazonaws.com/production/lives',
      {
        genre: genreList[parseInt(liveData.genre)],
        artist: liveData.artist,
        date: liveData.date,
        url: liveData.url,
        thumbnail: liveData.thumbnail,
        track: liveData.spotify_id,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        crossDomain: true
      }).then(res => {
        console.log('[success] POST - api lives', res);

        setValidInput({});
        setLiveData({
          artist: '',
          genre: "0",
          date: new Date(),
          url: '',
          spotify_id: '',
          track: '',
        });
        setUploadedFile({});
      }).catch(error => console.log('[error] POST - api lives', error));
      
    } else alert('[ERRO] Preencha todos os campos corretamente!');
  }

  return (
    <ImageBackground>
      <Logo><img src={logo} alt="musii logo" /></Logo>
      <Container>
        <Content>
          <h3>cadastro de lives</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="artist">artista ou grupo</label>
            <Input 
              value={liveData.artist}
              type="text" 
              id="artist"
              validInput={validInput['artist']} 
              onChange={e => handleInput(e.target.value, 'artist')}
              onBlur={e => handleInput(e.target.value, 'artist')}
            />
            <label htmlFor="genre">gênero musical</label>
            <Select 
              id="genre"
              validInput={validInput['genre']} 
              onChange={e => handleInput(e.target.value, 'genre')} 
              onBlur={e => handleInput(e.target.value, 'genre')} 
              value={liveData.genre}
            >
              {genreList.map((genre, idx) => <option key={idx} value={idx}>{genre}</option>)}
            </Select>
            <label htmlFor="date">data e hora da live</label>
            <DatePickerBox id="date" validInput={validInput['date']} >
              <DatePicker
                locale="pt"
                selected={liveData.date}
                onChange={date => handleInput(date, 'date')} 
                minDate={new Date()}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="horário"
                dateFormat="dd/MM/yy HH:mm"
              />
            </DatePickerBox>
            <label htmlFor="url">link da live *</label>
            <DescriptionInput>* caso não exista o link da live, inserir a <strong>URL do perfil onde será transmitida</strong></DescriptionInput>
            <Input 
              value={liveData.url}
              type="text" 
              id="url" 
              validInput={validInput['url']} 
              onChange={e => handleInput(e.target.value, 'url')}
              onBlur={e => handleInput(e.target.value, 'url')}
            />
            <label htmlFor="thumbnail">imagem de divulgação da live</label>
            {Object.keys(uploadedFile).length === 0
              ? <Upload onUpload={handleUpload} />
              : <UploadedFile file={uploadedFile} onDelete={handleDeleteFile} />
            }
            <label htmlFor="spotify_id">música de divulgação *</label>
            <DescriptionInput>* é possivel obter o <strong>'spotify:track:id-da-musica'</strong> na opção <span>Compartilhar > Copiar URI do Spotify</span></DescriptionInput>
            <Input 
              value={liveData.track}
              type="text" 
              id="spotify_id" 
              placeholder="spotify:track:66RcIgW1qU4wCyLmWNatQ3"
              validInput={validInput['spotify_id']} 
              onChange={e => {handleInput(e.target.value, 'spotify_id'); setLiveData({...liveData, track: e.target.value});}}
              onBlur={e => handleInput(e.target.value, 'spotify_id')}              
            />
            <SubmitButton type="submit">Cadastrar</SubmitButton>
          </form>
        </Content>
      </Container>
    </ImageBackground>
  )
}
export default LivesForm;