import { useState, useEffect } from "react";
import { intersection, not } from "../utils";
import ListBox from "./ListBox";
import "../App.css";

export interface Student {
  name: string;
  marks: string;
  regId: string;
}

const TransferList = () => {
  const [box1List, setBox1List] = useState<Student[]>([]);
  const [box2List, setBox2List] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const leftChecked: Student[] = intersection(box1List, selectedStudents);
  const rightChecked: Student[] = intersection(box2List, selectedStudents);

  useEffect(() => {
    const fetchList1 = async () => {
      const res = await fetch("/StudentList1.json");
      const data = await res.json();
      return data;
    };
    const fetchList2 = async () => {
      const res = await fetch("/StudentList2.json");
      const data = await res.json();
      return data;
    };

    const fetchData = async () => {
      const list1: Student[] = await fetchList1();
      const list2: Student[] = await fetchList2();

      const uniqueStudents: Student[] = [
        ...list1,
        ...list2.filter((x) => !list1.some((s) => s.regId === x.regId)),
      ];
      setBox1List(uniqueStudents);
    };

    fetchData();
  }, []);

  const selectStudent = (isSelected: boolean, student: Student) => {
    if (isSelected) {
      setSelectedStudents((prev) => [...prev, student]);
      return;
    } else {
      const updatedSelectedStudents = [...selectedStudents];
      const itemToDeleteIndex = updatedSelectedStudents.findIndex(
        (x) => x.regId === student.regId
      );
      updatedSelectedStudents.splice(itemToDeleteIndex, 1);
      setSelectedStudents(updatedSelectedStudents);
    }
  };

  const moveRight = () => {
    setBox2List((prev) => [...prev, ...leftChecked]);
    setBox1List((prev) => not(prev, leftChecked));
    setSelectedStudents((prev) => not(prev, leftChecked));
  };

  const moveLeft = () => {
    setBox1List((prev) => [...prev, ...rightChecked]);
    setBox2List((prev) => not(prev, rightChecked));
    setSelectedStudents((prev) => not(prev, rightChecked));
  };

  const moveAllRight = () => {
    setBox2List((prev) => [...prev, ...box1List]);
    setBox1List([]);
  };

  const moveAllLeft = () => {
    setBox1List((prev) => [...prev, ...box2List]);
    setBox2List([]);
  };

  return (
    <div className="text-white text-lg flex gap-12 items-center">
      <ListBox
        title="Box 1"
        listItems={box1List}
        selectedStudents={selectedStudents}
        handleChange={selectStudent}
      />
      <div className="flex flex-col gap-8 items-center">
        <button className="btn" onClick={moveAllRight}>
          {">>"}
        </button>
        <button className="btn" onClick={moveRight}>
          {">"}
        </button>
        <button className="btn" onClick={moveLeft}>
          {"<"}
        </button>
        <button className="btn" onClick={moveAllLeft}>
          {"<<"}
        </button>
      </div>
      <ListBox
        title="Box 2"
        listItems={box2List}
        selectedStudents={selectedStudents}
        handleChange={selectStudent}
      />
    </div>
  );
};

export default TransferList;
