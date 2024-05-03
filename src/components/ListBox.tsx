import { Student } from "./TransferList";

interface ListBoxProps {
  title: string;
  listItems: Student[];
  selectedStudents: Student[];
  handleChange: (isSelected: boolean, student: Student) => void;
}

const ListBox = ({
  title,
  listItems,
  selectedStudents,
  handleChange,
}: ListBoxProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold self-center">{title}</h1>
      <div className="flex flex-col gap-5 border-2 border-white rounded-lg p-8 w-80 h-[480px] overflow-scroll items-left justify-start">
        {listItems.map((x) => (
          <div className="flex gap-2 items-center" key={x.name}>
            <input
              type="checkbox"
              name="name"
              checked={
                selectedStudents.find((s) => s.regId === x.regId) ? true : false
              }
              onChange={(e) => handleChange(e.target.checked, x)}
              className="w-6 h-6"
            />
            <label htmlFor="name">{x.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBox;
