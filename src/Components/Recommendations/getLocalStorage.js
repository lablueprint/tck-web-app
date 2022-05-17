export default function GetLocalStorage(bookPosition) {
  const bookArr = JSON.parse(localStorage.getItem('Recently Viewed'));
  let id = 0;

  if (bookPosition >= 0 && bookPosition < 14) {
    id = bookArr[bookPosition];
  }

  return (
    id
  );
}
