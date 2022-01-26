import React, {useContext, useRef, useEffect} from "react";
import { Button } from "react-bootstrap";

import SimpleContext from "./../../context/SimpleContext";

const NewPerson = () => {
  const focusInput = useRef(null);

  const context = useContext(SimpleContext);

  useEffect(()=> {
    //به این دلیل اینجا مینویسیم ک باید اول کامپوننت روی صفحه اول نصب شود و بعد فوکس شود 
    focusInput.current.focus();
  },[])

  return (
    // <SimpleContext.Consumer>
    //   {(context) => (
        <div>
          <div className="m-2 p-2">
            <form
              className="form-inline justify-content-center"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="input-group w-25 ">
                <input
                  ref={focusInput}
                  type="text"
                  placeholder="اسم بهم بده"
                  className="form-control"
                  onChange={context.setPerson}
                  value={context.person}
                />
                <div className="input-group-prepend">
                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className=" fa fa-plus-square "
                    onClick={context.handleNewPerson}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
    //   )}
    // </SimpleContext.Consumer>
  );
};

export default NewPerson;
