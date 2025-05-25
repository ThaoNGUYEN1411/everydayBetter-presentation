// import { FC } from "react";
// import { Table } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheck,
//   faChevronLeft,
//   faChevronRight,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { v4 as uuid } from "uuid";

// interface ActivityStatus {
//   statuses: ("check" | "xmark")[]; // Represents the status for each day of the week
// }

// const activities: ActivityStatus[] = [
//   {
//     statuses: ["check", "check", "xmark", "check", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["xmark", "xmark", "xmark", "xmark", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["check", "xmark", "check", "check", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["xmark", "xmark", "xmark", "xmark", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["check", "xmark", "check", "check", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["xmark", "xmark", "xmark", "xmark", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["check", "check", "xmark", "check", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["xmark", "xmark", "xmark", "xmark", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["check", "check", "xmark", "check", "check", "xmark", "check"],
//   },
//   {
//     statuses: ["xmark", "xmark", "xmark", "xmark", "check", "xmark", "check"],
//   },
// ];

// const CalendarTable: FC<{ lineNumber?: string }> = ({ lineNumber }) => {
//   const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
//   const numberOfLines = lineNumber ? parseInt(lineNumber, 10) : 0;
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between mt-5 mb-2">
//         <FontAwesomeIcon icon={faChevronLeft} />
//         <h3 className="mb-3">Activités - Janvier 13/01 - 19/01/2025</h3>
//         <FontAwesomeIcon icon={faChevronRight} />
//       </div>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             {daysOfWeek.map((day) => (
//               <th key={uuid()}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {activities.slice(0, numberOfLines).map((activity) => (
//             <tr key={uuid()}>
//               {/* <td>{activity.activityName}</td> */}
//               {activity.statuses.map((status) => (
//                 <td key={uuid()} className="text-center">
//                   {status === "check" ? (
//                     <FontAwesomeIcon icon={faCheck} className="text-success" />
//                   ) : (
//                     <FontAwesomeIcon icon={faXmark} className="text-danger" />
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default CalendarTable;
