"use client"

import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";

export default function AddToDo() {
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = () => {
    setShowForm((prev) => !prev);
  }

  return (
    <>
      <button className={""} onClick={handleAddTask}>
        <BiAddToQueue className={"inline pb-1"} size={"24"}/> Add task
      </button>
      {showForm &&
        <form>
          <label>
            Name:
            <input name={"name"} type={"text"}
                   className={""}/>
          </label>
          <label>
            Details:
            <input name={"details"} type={"text"}
                   className={""}/>
          </label>
          <label>
            <select name={"priority"}
                    className={""}>
                <option value={"low"}>low</option>
                <option value={"normal"}>normal</option>
                <option value={"high"}>high</option>
            </select>
          </label>
          <button type={"submit"}
                  className={""}>Submit
          </button>
        </form>
      }
      </>
  )
}
