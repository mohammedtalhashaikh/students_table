const table = document.getElementById("table");
const tbody = document.getElementById("tbody");
const secondTable = document.getElementById("secondTable");
const ascendingSort = document.getElementById("ascendingSort");
const descendingSort = document.getElementById("descendingSort");
const marksSort = document.getElementById("marksSort");
const passingSort = document.getElementById("passingSort");
const classSort = document.getElementById("classSort");
const genderSort = document.getElementById("genderSort");
const inputFilter = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");

window.onload = fetchData();

searchBtn.addEventListener("click", () => {
  searchFilter(inputFilter.value);
});

inputFilter.addEventListener("keypress", (e) => {
  searchFilter(e.target.value);
});

inputFilter.addEventListener("keyup", (e) => {
  searchFilter(e.target.value);
});

ascendingSort.addEventListener("click", () => {
  studentsArray.sort((a, b) => {
    if (a.full_name < b.full_name) return -1;
    if (a.full_name > b.full_name) return 1;
    return 0;
  });

  clearTable();
  updateTable(studentsArray);
  hideSecondTable();
});

descendingSort.addEventListener("click", () => {
  studentsArray.sort((a, b) => {
    if (a.full_name < b.full_name) return 1;
    if (a.full_name > b.full_name) return -1;
    return 0;
  });
  clearTable();
  updateTable(studentsArray);
  hideSecondTable();
});

marksSort.addEventListener("click", () => {
  studentsArray.sort((a, b) => {
    if (a.marks < b.marks) return -1;
    if (a.marks > b.marks) return 1;
    return 0;
  });
  clearTable();
  updateTable(studentsArray);
  hideSecondTable();
});

passingSort.addEventListener("click", () => {
  const passingStudents = studentsArray.filter(
    (student) => student.passingBoolean
  );
  const failingStudents = studentsArray.filter(
    (student) => !student.passingBoolean
  );
  clearTable();
  updateTable(passingStudents);
  //   createAdditionalTable(failingStudents);
  hideSecondTable();
});

classSort.addEventListener("click", () => {
  studentsArray.sort((a, b) => {
    if (a.grade < b.grade) return -1;
    if (a.grade > b.grade) return 1;
    return 0;
  });
  clearTable();
  updateTable(studentsArray);
  hideSecondTable();
});

genderSort.addEventListener("click", () => {
  const maleStudents = studentsArray.filter(
    (student) => student.gender === "Male"
  );
  const femaleStudents = studentsArray.filter(
    (student) => student.gender === "Female"
  );
  clearTable();

  updateTable(maleStudents);
  createAdditionalTable(femaleStudents);
});

const studentsArray = [];

const fetchData = async () => {
  const response = await fetch("./MOCK_DATA.json");
  const students = await response.json();

  for (const student in students) {
    const {
      id,
      img_src,
      first_name,
      last_name,
      gender,
      class: grade,
      marks,
      passing,
      email,
    } = students[student];
    const newStudent = {
      id,
      img_src,
      full_name: `${first_name} ${last_name}`,
      gender,
      grade,
      marks,
      passingBoolean: passing,
      passing: passing ? "Passed" : "Failed",
      email,
    };
    studentsArray.push(newStudent);
  }

  updateTable(studentsArray);
};

const updateTable = (students) => {
  students.forEach((student) => {
    const newRow = addRow();
    addCell(newRow, student.id);
    addCell(newRow, student.full_name, student.img_src);
    addCell(newRow, student.gender);
    addCell(newRow, student.grade);
    addCell(newRow, student.marks);
    addCell(newRow, student.passing);
    addCell(newRow, student.email);
  });
};

fetchData();

const clearTable = () => {
  while (tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
  }
};

const addRow = () => {
  const newRow = document.createElement("tr");
  tbody.appendChild(newRow);
  return newRow;
};

const addCell = (row, cellValue, img_src = "") => {
  const newCell = document.createElement("td");
  if (img_src !== "") {
    const img = document.createElement("img");
    img.setAttribute("src", img_src);
    img.setAttribute("alt", cellValue);
    img.setAttribute("width", 30);

    newCell.appendChild(img);
  }
  newCell.appendChild(document.createTextNode(cellValue));

  newCell.classList.add("cell");
  row.appendChild(newCell);
};

const createAdditionalTable = (students) => {
  const secondTbody = document.getElementById("secondTbody");
  secondTable.style.display = "block";

  students.forEach((student) => {
    const newRow = document.createElement("tr");
    secondTbody.appendChild(newRow);
    addCell(newRow, student.id);
    addCell(newRow, student.full_name, student.img_src);
    addCell(newRow, student.gender);
    addCell(newRow, student.grade);
    addCell(newRow, student.marks);
    addCell(newRow, student.passing);
    addCell(newRow, student.email);
  });
};

const hideSecondTable = () => {
  secondTable.style.display = "none";
};

const searchFilter = (filter) => {
  if (filter === "" || filter === undefined) return;

  const filteredArray = studentsArray.filter(
    (student) =>
      student.full_name.toLowerCase().includes(filter.toLowerCase()) ||
      student.email.toLowerCase().includes(filter.toLowerCase())
  );
  clearTable();
  updateTable(filteredArray);
  hideSecondTable();
};
