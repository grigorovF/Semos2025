export const Galery = ({listOfPhotos}) => {
    console.log(listOfPhotos)
 
      return (
        <div id="gallery">
          {listOfPhotos.map((photo) => {
            return (
              <div className="image-holder" key={photo.id}>
                <img
                  src={photo.download_url}
                  alt={photo.author}
                  height={150}
                  width={150}
                />
              </div>
            );
          })}
        </div>
      );
    };
    
    // Da se dodade ushte eden context za Albums (prevzemeni od https://jsonplaceholder.typicode.com vo App.jsx fajlot ) 
    // i preku context preneseni i mapirani vo Album.jsx fajl, kako i da se dodade button za brishenje na selektiranata slika 
    // od popup koj ke ja izbrise slikata od array-ot i ke go zatvori popup-ot isto da bide napraveno koristejki context
    
    