// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/common/ui/Button";
// import { Search } from "lucide-react";


// interface SearchBoxProps<T> {
//   data: T[];
//   searchKeys: (keyof T)[];
//   onSelect: (item: T) => void;
//   placeholder?: string;
//   filterOptions?: string[];
//   onFilterChange?: (filtered: T[]) => void;
// }

// function SearchBox<T extends Record<string, any>>({
//   data,
//   searchKeys,
//   onSelect,
//   placeholder = "Search...",
//   filterOptions = [],
//   onFilterChange
// }: SearchBoxProps<T>) {
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState(filterOptions[0] || "");

//   const handleSearch = () => {
//     if (query.trim().length < 3) {
//       console.warn("Search query must be at least 3 characters.");
//       if (onFilterChange) onFilterChange([]); // Clear results if query too short
//       return;
//     }

//     const filtered = data.filter(item =>
//       searchKeys.some(key => {
//         const value = item[key];
//         return String(value ?? "")
//           .toLowerCase()
//           .includes(query.toLowerCase());
//       })
//     );

//     if (onFilterChange) {
//       onFilterChange(filtered);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="flex gap-2">
//       <input
//   type="text"
//   placeholder={placeholder}
//   value={query}
//   onChange={e => setQuery(e.target.value)}
//   className="w-full p-2 rounded border border-gray-300 bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700"
// />

//         {filterOptions.length > 0 && (
//           <select
//             value={filter}
//             onChange={e => {
//               setFilter(e.target.value);
//             }}
//             className="p-2 border rounded"
//           >
//             {filterOptions.map(option => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         )}
//         <Button variant="secondary" onClick={handleSearch}>
//         <Search className="w-5 h-5" />
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default SearchBox;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/ui/Button";
import { Search } from "lucide-react";

interface SearchBoxProps<T> {
  data: T[];
  searchKeys: string[];
  onSelect: (item: T) => void;
  placeholder?: string;
  filterOptions?: string[];
  onFilterChange?: (filtered: T[]) => void;
}

function SearchBox<T extends Record<string, any>>({
  data,
  searchKeys,
  onSelect,
  placeholder = "Search...",
  filterOptions = [],
  onFilterChange,
}: SearchBoxProps<T>) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(filterOptions[0] || "");

  const handleSearch = () => {
    if (query.trim().length < 3) {
      console.warn("Search query must be at least 3 characters.");
      if (onFilterChange) onFilterChange([]); 
      return;
    }

    const filtered = data.filter((item) =>
      searchKeys.some((key) => {
        const keys = key.split(".");
        let value: any = item;

        for (const k of keys) {
          value = value?.[k];
        }

        return String(value ?? "")
          .toLowerCase()
          .includes(query.toLowerCase());
      })
    );

    if (onFilterChange) {
      onFilterChange(filtered);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700"
        />
        {filterOptions.length > 0 && (
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="p-2 border rounded"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        <Button variant="secondary" onClick={handleSearch}>
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default SearchBox;
