let cachedFiles = {};

export const downloadCVWithCache = (fileUrl, fileName) => {
  if (!cachedFiles[fileName]) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    cachedFiles[fileName] = true;
  } else {
    alert(`Файл "${fileName}" уже был скачан. Проверьте папку "Загрузки".`);
    console.log(`Файл "${fileName}" уже был скачан.`);
  }
};
