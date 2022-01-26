import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import Persons from "./components/Person/Persons";
import NewPerson from "./components/Person/NewPerson";
import Header from "./components/common/Header";

import SimpleContext from "./context/SimpleContext";


class App extends React.Component {
    constructor() {
        super();
        this.toggleShowHeader = React.createRef();
    }

    state = {
        persons: [],
        person: "",
        showPersons: true,
        showHeader: true,
    };

    componentDidMount() {
        this.toggleShowHeader.current.click(); // وقتی صفحه باز شد برامون کلیک میکنه یعنی true رو به false تبدیل میکنه
    }

    handleShowPerson = () => {
        this.setState({ showPersons: !this.state.showPersons });
    };

    handleShowHeader = () => {
        this.setState({ showHeader: !this.state.showHeader });
    };

    handleDeletePerson = (iD) => {
        const newPersons = [...this.state.persons];

        // اون id هایی ک برابر iD نیستن رو بر میگردانه
        // یا به عبارتی : همه رو بده به جز اون iD
        const filteredPersons = newPersons.filter((p) => p.id !== iD);
        this.setState({ persons: filteredPersons });

        const personIndex = newPersons.findIndex((p) => p.id === iD);
        const person1 = newPersons[personIndex];

        toast.error(`${person1.fullname} با موفقیت حذف شد `, {
            position: "top-right",
            closeOnClick: true,
            draggable: true,
        });
    };

    handleNameChange = (event, iD) => {
        const { persons: allPersons } = this.state;

        const personIndex = allPersons.findIndex((p) => p.id === iD);
        const person1 = allPersons[personIndex];
        person1.fullname = event.target.value;

        // چون ما نمیخواهیم مستقیم state  رو تغییر دهیم از این روش میرویم
        // در این روش ما یک spread از state میگیریم و مقادیر را در ان تغییر میدهیم
        const persons2 = [...allPersons];

        persons2[personIndex] = person1;
        this.setState({ persons: persons2 });
    };

    handleNewPerson = () => {
        // از ارایه person ما spread میگیریم تا مقدار قبلی ساخته شده حفظ شود
        const persons2 = [...this.state.persons];
        const person1 = {
            id: Math.floor(Math.random() * 10000),
            fullname: this.state.person,
        };

        if (person1.fullname !== "" && person1.fullname !== " ") {
            persons2.push(person1);
            this.setState({ persons: persons2 });
            this.setState({ person: "" });

            toast.success("شخص با موفقیت اضافه شد. ", {
                position: "bottom-right",
                closeButton: true,
                autoClose: 8000,
                draggable: true,
                closeOnClick: true,
            });
        }
    };

    setPerson = (event) => {
        this.setState({ person: event.target.value });
    };

    render() {
        const { persons, person, showPersons, showHeader } = this.state;

        let person2 = null;
        let button;

        // if به معنی true بودن state هستش
        if (showPersons) {
            person2 = <Persons />;
            button = "اشخاص مخفی شوند؟";
        } else {
            button = "اشخاص مشخص شوند؟";
        }

        return (
            <SimpleContext.Provider
                value={{
                    persons: persons,
                    person: person,
                    handleDeletePerson: this.handleDeletePerson,
                    handleNameChange: this.handleNameChange,
                    handleNewPerson: this.handleNewPerson,
                    setPerson: this.setPerson,
                }}
            >
                <div className="rtl text-center">
                    {showHeader ? (
                        <Header appTitle="مدیریت کننده اشخاص" />
                    ) : null}

                    <Button
                        ref={this.toggleShowHeader}
                        onClick={this.handleShowHeader}
                    >
                        نمایش هدر
                    </Button>

                    <NewPerson />

                    <Button
                        onClick={this.handleShowPerson}
                        variant={showPersons ? "danger" : "info"}
                    >
                        {button}
                    </Button>

                    {person2}

                    <ToastContainer />
                </div>
            </SimpleContext.Provider>
        );
    }
}

export default App;

// const App = () => {
//   const [getPersons, setPersons] = useState([]);
//   const [getSinglePerson, setSinglePerson] = useState("");
//   const [getShowPersons, setShowPersons] = useState(true);

//   const handleShowPerson = () => {
//     setShowPersons(!getShowPersons);
//   };

//   const handleDeletePerson = (iD) => {
//     const newPersons = [...getPersons];

//     // اون id هایی ک برابر iD نیستن رو بر میگردانه
//     // یا به عبارتی : همه رو بده به جز اون iD
//     const filteredPersons = newPersons.filter((p) => p.id !== iD);
//     setPersons(filteredPersons);

//     const personIndex = newPersons.findIndex((p) => p.id === iD);
//     const person1 = newPersons[personIndex];

//     toast.error(`${person1.fullname} با موفقیت حذف شد `, {
//       position: "top-right",
//       autoClose: 4000,
//       closeOnClick: true,
//       draggable: true,
//     });
//   };

//   const handleNameChange = (event, iD) => {
//     // const { persons: allPersons } = getPersons;

//     const personIndex = getPersons.findIndex((p) => p.id === iD);
//     const person1 = getPersons[personIndex];
//     person1.fullname = event.target.value;

//     // چون ما نمیخواهیم مستقیم state  رو تغییر دهیم از این روش میرویم
//     // در این روش ما یک spread از state میگیریم و مقادیر را در ان تغییر میدهیم
//     const persons2 = [...getPersons];

//     persons2[personIndex] = person1;
//     setPersons(persons2);
//   };

//   const handleNewPerson = () => {
//     // از ارایه person ما spread میگیریم تا مقدار قبلی ساخته شده حفظ شود
//     const persons = [...getPersons];
//     const person1 = {
//       id: Math.floor(Math.random() * 1000),
//       fullname: getSinglePerson,
//     };

//     if (person1.fullname !== "" && person1.fullname !== " ") {
//       persons.push(person1);
//       setPersons(persons);
//       setSinglePerson("");

//       toast.success("شخص با موفقیت اضافه شد. ", {
//         position: "bottom-right",
//         closeButton: true,
//         autoClose: 4000,
//         draggable: true,
//         closeOnClick: true,
//       });
//     }
//   };

//   const setPerson = (event) => {
//     setSinglePerson(event.target.value);
//   };

//   let person2 = null;
//   let button;

//   // if به معنی true بودن state هستش
//   if (getShowPersons) {
//     person2 = <Persons />;
//   }

//   if(getShowPersons){
//     button= "اشخاص مخفی شوند؟"
//   } else {
//     button = "اشخاص مشخص شوند؟"
//   }

//   return (
//     <SimpleContext.Provider
//       value={{
//         persons: getPersons,
//         person: getSinglePerson,
//         handleDeletePerson: handleDeletePerson,
//         handleNameChange: handleNameChange,
//         handleNewPerson: handleNewPerson,
//         setPerson: setPerson,
//       }}
//     >
//       <Fragment>
//         <div className="rtl text-center">

//           <Header appTitle="مدیریت کننده اشخاص" />

//           <NewPerson />

//           <Button
//             onClick={handleShowPerson}
//             variant={getShowPersons ? "danger" : "info"}
//           >
//             {button}
//           </Button>
//           {person2}
//           <ToastContainer />
//         </div>
//       </Fragment>
//     </SimpleContext.Provider>
//   );
// };
