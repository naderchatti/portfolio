export const downloadEnglish = (toggleShowModal: () => void) => {
  downloadResume('/documents/CV_Nader_CHATTI_EN.pdf', 'CV Nader CHATTI EN.pdf');
  toggleShowModal();
};

export const downloadFrench = (toggleShowModal: () => void) => {
  downloadResume('/documents/CV_Nader_CHATTI_FR.pdf', 'CV Nader CHATTI FR.pdf');
  toggleShowModal();
};

const downloadResume = (path: string, filename: string) => {
  const link = document.createElement('a');
  link.href = path;
  link.target = '_blank';
  link.setAttribute('download', filename);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
