import { v4 } from "uuid";
import { useState } from "react";
import BookCard from './components/BookCard';
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import {toast} from "react-toastify"

function App() {

  // kitap state'leri
  const[books, setBooks] = useState ([]);
  const[bookName, setBookName] = useState('');
  const[inputError, setInputError] = useState(false);

  // modal stateleri
  const [showDeleteModal , setShowDeleteModal] = useState(false);
  const [deleteId , setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem ,setEditItem] = useState(null);
  
  //inputtaki değişimi izler
  const handleChange = (e) => {

    // state'i güncelle
    setBookName(e.target.value);
  };


  // Formun gönderilme olayını izler
  const handleSubmit = (e) => {
    e.preventDefault();


    if(!bookName){
      toast.warn("Lütfen kitap ismi giriniz", {
        autoClose: 2500,
        theme: "colored",
      })

      return;
    }


    // kitabı saklamak için gerekli verilere sahip obje oluşturma
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false, 
    
    };

    // oluşturulan kitap objesini kitaplar dizisine aktar
      // spread operatörü ile önceden eklenen elemanları saklama
      setBooks([...books, newBook]);
      // eleman eklenince inputu sıfırla
      setBookName('');

      toast.success('Kitap Başarıyla Eklendi', {
        autoClose: 2000,
        theme: "colored"
      });

  };

  // silinme esnasında modal açma işlemi
  const handleModal = (id) => {
    // id state'e aktar
    setDeleteId(id);
    // modalı ekrana bas
    setShowDeleteModal(true);
    
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // silinecek id'ye eşit olmayanları diziye aktar
    const filtred = books.filter((book) => book.id !== deleteId);

    // state güncelle
    setBooks(filtred);

    // modal kapatma
    setShowDeleteModal(false)

    // bildirim verme
    toast.error('Kitap Başarıyla Silindi', {
      autoClose: 2000,
      theme: "colored"
    });
  };


// okundu metodu

const handleRead = (book) => {
  // okundu değerini tersine çevirme
  const updatedBook = {...book , isRead: !book.isRead}

  // güncellenecek elemanın sırasını bulma
  const index = books.findIndex((item) => item.id === book.id);

  // books kopyası oluşturma 
  const cloneBooks = [...books]

  // dizinin kopyasında gerekli elemanı güncelle
  cloneBooks[index] = updatedBook;

  /// state güncelle
  setBooks(cloneBooks);
};

const handleEditModal = (book) => {
  // düzenlenecek elemanı state'a aktar
  
  setEditItem(book);
  
  // modalı aç
  setShowEditModal(true);
}

// kitabı güncelle
// kaydete basınca kitap güncellenir

const handleEditBook = () => {
  // sıra bulma
  const index = books.findIndex((book) => book.id === editItem.id);

  // state'in kopyasını alma
  const cloneBooks = [...books]

  // eski kitabı diziden çıkart, yerine yenisini koy
  cloneBooks.splice(index,1,editItem)

  // state güncelle
  setBooks(cloneBooks);
  // modalı kapat
  setShowEditModal(false);

  // bildirim ver
  toast.info("Güncelleme Kaydedildi", {
    autoClose: 2500,
    theme: "colored"
  })

}




  return (
    <div>
      <header className="bg-dark text-light py-3 fs-5 text-center">
        <h1>Kitap Kurdu</h1>
      </header>
      <div className="container">
        {/* hata bildirimini ekrana yansıtma */}
      {
        inputError && (
          <div className="alert alert-danger mt-5">{inputError}</div>
        )
      }
      <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
        <input 
        onChange={handleChange}
        value={bookName}
        placeholder="Kitap ismi giriniz..." 
        className="form-control shadow" 
        type="search" />
        <button className="btn btn-warning">Ekle</button>
      </form>

      
      {/* Eğer state'in içi boş ise ekrana bunu yaz*/}
      {books.length === 0 && (<h4 className="mt-2">Henüz kitap eklenmedi.</h4>)}
      {/* Eğer state'in içinde en az bir eleman var ise ekrana bunu yaz*/}
      {books.map((book) => (
        <BookCard 
        key={book.id} 
        book={book} 
        handleModal={handleModal} 
        handleRead={handleRead}
        handleEditModal={handleEditModal}/>
      ))}
      </div>

      {/* Modallar */}
      {showDeleteModal && <DeleteModal 
      handleDelete={handleDelete} 
      setShowDeleteModal={setShowDeleteModal}/>}

      
        {showEditModal && 
        <EditModal 
        editItem={editItem} 
        setEditItem={setEditItem} 
        setShowEditModal={setShowEditModal}
        handleEditBook={handleEditBook}
        /> }
      
    </div>
  );
};

export default App;
