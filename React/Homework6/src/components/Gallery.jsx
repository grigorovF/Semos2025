import {useContext} from 'react';
import {Popup} from './Popup';
import {GalleryContext} from '../utils/GalleryContext';

export const Gallery = ({listOfPhotos}) => {
    const {selectedImage, setSelectedImage} = useContext(GalleryContext);
    return (
        <div id='gallery'>
            {listOfPhotos.map((photo) => {
                return (
                  <div
                    className="image-holder"
                    key={photo.id}
                    onClick={() => {
                      setSelectedImage(photo.download_url);
                    }}
                  >
                    <img
                      src={photo.download_url}
                      alt={photo.author}
                      height={150}
                      width={150}
                      onClick={() => {
                        setSelectedImage(photo.download_url);
                      }}
                    />
                  </div>
                );
            })}

            {selectedImage !== "" && <Popup/>}
            console.log(selectedImage);
            
            
        </div>
    )
}

