
import { downloadCVWithCache } from '@/services/fileDownloader';
import NataAvodesBio from '@/assets/Nata Avodes-bio_cv.pdf';
import NataAvodesCV from '@/assets/Nata Avodes-bio_портфолио.pdf';

export function useDownloadDoc() {
  const handleDownload = (file, filename) => {
    downloadCVWithCache(file, filename);
  };

  const downloadBio = () => handleDownload(NataAvodesBio, 'Nata Avodes-bio_cv.pdf');
  const downloadCV = () => handleDownload(NataAvodesCV, 'Nata Avodes-bio_портфолио.pdf');

  return {
    downloadBio,
    downloadCV,
  };
}
