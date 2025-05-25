// import { useState } from "react";
// import { Button, ButtonGroup, DropdownButton } from "react-bootstrap";
// //1.list activities to track
// const activities = ["Faire du sport", "Apprendre anglais"];

// //2. define the structure of the tracking data: here’s a map of dates to a boolean indicating whether the activity was done on that date

// type ActivityData = {
//   [activity: string]: {
//     [date: string]: boolean;
//   };
// };

// //3. display the current week in the table header
// const getWeekDates = (startDate: Date): Date[] => {
//   const dates: Date[] = [];
//   for (let i = 1; i < 8; i++) {
//     const d = new Date(startDate);
//     d.setDate(startDate.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// };

// export default function ActivityTracker() {
//   //todo: start monday
//   const [startDate, setStartDate] = useState<Date>(() => {
//     const d = new Date();
//     const day = d.getDay();
//     d.setDate(d.getDate() - day); // Commencer au dimanche
//     return d;
//   });

//   const [data, setData] = useState<ActivityData>(() => {
//     const initialData: ActivityData = {};
//     activities.forEach((activity) => {
//       initialData[activity] = {};
//     });
//     return initialData;
//   });

//   const weekDates = getWeekDates(startDate);

//   const toggle = (activity: string, dateStr: string, done: boolean) => {
//     setData((prev) => ({
//       ...prev,
//       [activity]: {
//         ...prev[activity],
//         [dateStr]: !prev[activity]?.[dateStr],
//       },
//     }));
//     console.log(activity, dateStr, done);
//   };

//   const handleWeekChange = (direction: "prev" | "next") => {
//     const newStart = new Date(startDate);
//     newStart.setDate(startDate.getDate() + (direction === "next" ? 7 : -7));
//     setStartDate(newStart);
//   };

//   return (
//     <div>
//       <div className="mb-2">
//         <button onClick={() => handleWeekChange("prev")}>⬅️</button>
//         <span className="mb-3">
//           Semaine du {weekDates[0].toLocaleDateString("fr-FR")} au
//           {weekDates[6].toLocaleDateString("fr-FR")}
//         </span>
//         <button onClick={() => handleWeekChange("next")}>➡️</button>
//       </div>

//       <table border={1} cellPadding={10} className="table-activity">
//         <thead>
//           <tr>
//             <th>Activité</th>
//             {weekDates.map((date, i) => (
//               <th key={i}>
//                 {date.toLocaleDateString("fr-FR", {
//                   weekday: "short",
//                   day: "numeric",
//                 })}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {activities.map((activity) => (
//             <tr key={activity}>
//               <td>{activity}</td>
//               {weekDates.map((date, i) => {
//                 const dateStr = date.toDateString();
//                 const checked = data[activity]?.[dateStr] ?? false;
//                 return (
//                   <td
//                     key={i}
//                     className="track-btn"
//                     // onClick={() => toggle(activity, dateStr)}
//                   >
//                     {/* {checked ? "✔" : "✘"} */}
//                     <ButtonGroup>
//                       <DropdownButton
//                         as={ButtonGroup}
//                         title=" "
//                         //   title={<FontAwesomeIcon icon={faChevronDown} />}
//                         // id="bg-nested-dropdown"
//                         variant="info"
//                         className="btn-group"
//                       >
//                         <Button
//                           value="true"
//                           onClick={() => toggle(activity, dateStr, true)}
//                         >
//                           ✔
//                         </Button>
//                         <Button
//                           value="false"
//                           onClick={() => toggle(activity, dateStr, true)}
//                         >
//                           ✘
//                         </Button>
//                       </DropdownButton>
//                     </ButtonGroup>{" "}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// /*
// By default, JavaScript's Date.getDay()` returns:

// 0 for Sunday,

// 1 for Monday,

// ...

// 6 for Saturday.
// */
