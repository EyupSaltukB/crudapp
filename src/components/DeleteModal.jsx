
const DeleteModal = ({handleDelete, setShowDeleteModal}) => {
  return (
    <div className="delete-modal">
        <div className="modal-inner shadow">
        <h5>Öğeyi silmek istiyor musunuz?</h5>
        <button className="btn btn-secondary" 
        onClick={() => setShowDeleteModal(false)}>Vazgeç</button>
        <button className="btn btn-danger" onClick={handleDelete}>Onayla</button>
        </div>
    </div>
  )
}

export default DeleteModal
