const response = {
  allocationKey: 124,
  portfolioNumber: "IN0215241001",
  fundSplitStatus: [
    {
      fundCode: "PICNGI",
      percentage: 18.0,
      isUpdated: true,
      error: {
        code: null,
        key: null,
        description: null
      }
    },
    {
      fundCode: "PICIMS",
      percentage: 80.0,
      isUpdated: true,
      error: {
        code: null,
        key: null,
        description: null
      }
    }
  ]
};

function getMessage(data) {
  const statuses = data.fundSplitStatus.map(record => record.isUpdated);
  const allTrue = statuses.every(status => status === true);
  const allFalse = statuses.every(status => status === false);
  
  if (allTrue) {
    return "All records are updated.";
  } else if (allFalse) {
    return "None of the records are updated.";
  } else {
    return "Some records are updated and some are not.";
  }
}

const message = getMessage(response);
console.log(message);