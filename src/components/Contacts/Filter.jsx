import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/contacts/selectors";
import { changeFilter } from "../../redux/contacts/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div style={{ marginBottom: "20px" }}>
      Filter contacts by name:
      <input
        id="filter"
        type="text"
        name="filter"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        style={{ marginLeft: "10px", padding: "5px" }}
      />
    </div>
  );
};

export default Filter;
