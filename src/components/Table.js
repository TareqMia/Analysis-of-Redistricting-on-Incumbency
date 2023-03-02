import React, { useRef, useEffect, useState } from "react";
import flCandidates from "../json/incumbent-2022/Florida-Incumbent-2022.json";
import gaCandidates from "../json/incumbent-2022/Georgia-Incumbent-2022.json";
import paCandidates from "../json/incumbent-2022/Pennslyvania-Incumbent-2022.json";

const Table = ({ currentState }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (currentState === "florida") {
      setData(flCandidates);
    }
    if (currentState === "georgia") {
      setData(gaCandidates);
    }
    if (currentState === "pennsylvania") {
      setData(paCandidates);
    }

    if (currentState === null) {
      setData([]);
    }
  }, [currentState]);

  return (
    <div className="incumbents">
      <table className="ui celled table">
        <tr>
          <th>Name</th>
          <th>Party</th>
          <th>Election Result</th>
          <th>District</th>
          <th>Political Affiliation</th>
          <th>Geographic Variation</th>
          <th>Population Variation</th>
        </tr>
        {data.map((val, key) => {
          // console.log(val);
          let color = val.Party === "DEM" ? "blue" : "red";
          return (
            <tr key={key}>
              <td>{val.Candidate}</td>
              <td style={{ color: color }}>{val.Party}</td>
              <td>{val["Primary Outcome"]}</td>
              <td>{val.District}</td>
              <td>{val.State}</td>
              <td>{(Math.random() + 0.3).toFixed(1)}</td>
              <td>{(Math.random()*500 - 100).toFixed(1)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;

// import React, { useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import flHouse22 from "../json/winners/flHouse2022.json";
// import gaHouse22 from "../json/winners/gaHouse2022.json";
// import paHouse22 from "../json/winners/paHouse2022.json";
// import flCandidates from "../json/candidates/FL2022_candidates.json";
// import gaCandidates from "../json/candidates/GA2022_candidates.json";
// import paCandidates from "../json/candidates/PA2022_candidates.json";

// const Table = ({ currentState }) => {
//   const data = useMemo(() => {
//     if (currentState === "florida") {
//       return flCandidates;
//     }
//     if (currentState === "georgia") {
//       return gaCandidates;
//     }
//     if (currentState === "pennsylvania") {
//       return paCandidates;
//     }
//     return [];
//   }, [currentState]);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Name",
//         accessor: "Candidate",
//       },
//       {
//         Header: "Party",
//         accessor: "Party",
//         Cell: ({ value }) => (
//           <div style={{ color: value === "DEM" ? "blue" : "red" }}>{value}</div>
//         ),
//       },
//       {
//         Header: "Election Result",
//         accessor: "Primary Outcome",
//       },
//       {
//         Header: "District",
//         accessor: "District",
//       },
//       {
//         Header: "Political Affiliation",
//         accessor: "State",
//       },
//       {
//         Header: "Incumbency?",
//         accessor: "Incumbent",
//       },
//       {
//         Header: "Geographic Variation",
//         accessor: "Primary Votes",
//       },
//       {
//         Header: "Population Variation",
//         accessor: "Primary %",
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     nextPage,
//     previousPage,
//     pageOptions,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 },
//     },
//     usePagination
//   );

//   useEffect(() => {
//     nextPage(0);
//   }, [currentState]);

//   return (
//     <div>
//       <div style={{ height: "500px", overflow: "auto" }} className="incumbents">
//         <table className="ui celled table" {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row, i) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => {
//                     return (
//                       <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <div className="pagination">
//           <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             Previous
//           </button>
//           <span>
//             Page{" "}
//             <strong>
//               {pageIndex + 1} of {pageOptions.length}
//             </strong>{" "}
//           </span>
//           <button onClick={() => nextPage()} disabled={!canNextPage}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table;
