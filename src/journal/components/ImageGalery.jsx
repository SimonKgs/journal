import { ImageList, ImageListItem } from "@mui/material";


export const ImageGalery = ( { images } ) => {

  return (
    <ImageList sx={{ width: 1000, height: 450 }} cols={6} rowHeight={200}>
      {images.map((img) => (
        <ImageListItem key={img}>
          <img
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='imagen nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}