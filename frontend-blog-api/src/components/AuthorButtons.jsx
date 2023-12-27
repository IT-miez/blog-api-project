
function AuthorButtons ({ currentUser, postAuthor, onDelete, onEdit }) {
  // Check if currentUser and postAuthor are the same
  const isCurrentUserAuthor = currentUser === postAuthor;

  // Render the buttons only if currentUser is the same as postAuthor
  return isCurrentUserAuthor ? (
    <div>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  ) : null;
}

export default AuthorButtons;
