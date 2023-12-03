export const fileToBase64 = (file: File | string) => {
  return typeof file === 'string'
    ? file
    : new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
};

