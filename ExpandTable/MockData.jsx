//MockData.jsx;
import React, { useState } from "react";
import ExpandTable from "./ExpandTableData";

const MockData = () => {
  const [expandedData, setExpandedData] = useState([
    {
      profile_id: "1",
      profile_name: "Profile A",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "2",
      profile_name: "Profile B",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "3",
      profile_name: "Profile C",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "4",
      profile_name: "Profile D",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "5",
      profile_name: "Profile E",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "6",
      profile_name: "Profile F",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },

    {
      profile_id: "7",
      profile_name: "Profile 12",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "8",
      profile_name: "Profile 123",
      customer_name: "12453",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
  ]);

  return (
    <div>
      <ExpandTable data={expandedData} setData={setExpandedData} />
    </div>
  );
};

export default MockData;
