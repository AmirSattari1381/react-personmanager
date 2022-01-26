import React, { memo, useContext } from "react";
import Person from "./Person";
import SimpleContext from "./../../context/SimpleContext";

const Persons = () => {
  const context = useContext(SimpleContext);
  return (
    <div>
      {context.persons.map((person) => (
        <Person
          key={person.id}
          fullname={person.fullname}
          // بهترین روش برای پارامتر دادن به تابع این است ک به شکل ارو فانکشن بدهیم
          deleted={() => context.handleDeletePerson(person.id)}
          // این event ورودی میگوید ک کدام input اجرا شده و مقدار change ان چیست
          changed={(event) => context.handleNameChange(event, person.id)}
        />
      ))}
    </div>
  );
};

// class Persons extends React.Component {
//   static contextType = SimpleContext;  // با کلمه کلیدی this.context به مقدار context مان دسترسی پیدا میکنیم
  
//   shouldComponentUpdate(nextProp, nextState){
//     console.log('Person.jsx shouldComponentUpdate');
//     return true;
//   }

//   getSnapshotBeforeUpdate(prevProps, preveState){
//     console.log("Person.jsx getSnapshotBeforUpdate");
//   }

//   render() {
//     return (
//       <div>
//         {this.context.persons.map((person) => (
//           <Person
//             key={person.id}
//             fullname={person.fullname}
//             // بهترین روش برای پارامتر دادن به تابع این است ک به شکل ارو فانکشن بدهیم
//             deleted={() => this.context.handleDeletePerson(person.id)}
//             // این event ورودی میگوید ک کدام input اجرا شده و مقدار change ان چیست
//             changed={(event) => this.context.handleNameChange(event, person.id)}
//           />
//         ))}
//       </div>
//     );
//   }
// }

export default memo(Persons);
