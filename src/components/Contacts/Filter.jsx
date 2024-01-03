import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/contacts/selectors";
import { changeFilter } from "../../redux/contacts/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <label
        htmlFor="filter"
        style={{ marginRight: "10px", fontWeight: "bold" }}
      >
        Filter contacts by name:
      </label>
      <input
        id="filter"
        type="text"
        name="filter"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          outline: "none",
        }}
      />
    </div>
  );
};

export default Filter;
