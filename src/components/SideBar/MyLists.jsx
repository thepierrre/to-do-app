import './MyLists.css';

const myLists = (props) => {
    const { LISTS } = props;

    const listsList = LISTS.map((list) => (
        <li key={list.id}>{list.name}</li>
    ))
    
  return (
    <div className="lists">
      <h2>My Lists</h2>
      {listsList}
    </div>
  );
};

export default myLists;