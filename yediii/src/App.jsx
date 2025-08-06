import React, {useState} from 'react';
import { WelcomePage } from './WelcomePage';
import { GalleryPage } from './GalleryPage';

export default function App() {
  const [showGallery, setShowGallery] = useState(false);
  return showGallery
    ? <GalleryPage />
    : <WelcomePage onEnterGallery={() => setShowGallery(true)} />;
}
