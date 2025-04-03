"use client";

import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";

const sample = [
  {
    src: "https://unsplash.com/photos/I-8e7wx2hao/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQyMjI4NjQ5fA&force=true&w=800",
    width: 1080,
    height: 780,
    alt: "Photo 1",
    key: "photo-1",
  },
  {
    src: "https://unsplash.com/photos/I-8e7wx2hao/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQyMjI4NjQ5fA&force=true&w=800",
    width: 1080,
    height: 780,
    alt: "Photo 2",
    key: "photo-2",
  },
  {
    src: "https://unsplash.com/photos/I-8e7wx2hao/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQyMjI4NjQ5fA&force=true&w=800",
    width: 1080,
    height: 780,
    alt: "Photo 3",
    key: "photo-3",
  },
  {
    src: "https://unsplash.com/photos/I-8e7wx2hao/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQyMjI4NjQ5fA&force=true&w=800",
    width: 1080,
    height: 780,
    alt: "Photo 4",
    key: "photo-4",
  },
  {
    src: "https://unsplash.com/photos/I-8e7wx2hao/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQyMjI4NjQ5fA&force=true&w=800",
    width: 1080,
    height: 780,
    alt: "Photo 5",
    key: "photo-5",
  },
];

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  key: string;
};

type GalleryProps = {
  photos?: Array<Photo>;
  showAlt?: boolean;
};

export default function Gallery({ photos = sample, showAlt }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        spacing={16}
        padding={10}
        render={{
          extras: (_, { photo }) => (showAlt ? <div>{photo.alt}</div> : null),
        }}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
}
