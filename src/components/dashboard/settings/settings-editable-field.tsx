import { useState } from "react";
import { Pencil } from "lucide-react";

type EditableFieldProps = {
  fieldName: string;
  fieldValue: string;
  dbKey: string
  isEditable?: boolean
  onSave: (newValue: { [key: string]: string }) => void;
};

export default function SettingEditableField({ fieldName, fieldValue, onSave, dbKey, isEditable = true }: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(fieldValue);

  const handleSave = () => {
    onSave({[dbKey]: tempValue});
    setEditing(false);
  };

  const handleCancel = () => {
    setTempValue(fieldValue)
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[#111] text-sm font-normal">{fieldName}</h1>
      
      {!editing ? 
        (
        <div className="flex items-start justify-between py-1">
          <p className="text-[#555] text-sm font-light">{fieldValue}</p>
          {isEditable && <Pencil size={16} strokeWidth={2} className="text-[#111] cursor-pointer" onClick={() => setEditing(true)}/>}
        </div>
        ) 
        : 
        (
        <div className="flex flex-col gap-2 border border-[#D4D4D4] rounded-md p-2">
          <input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full px-2 py-2.5 text-[#111] text-sm font-normal focus:outline-none border"
          />
          {/* BUTTONS */}
          <div className="w-full flex flex-row items-center gap-3">
            {/* CANCEL BUTTON */}
            <button 
              onClick={handleCancel} 
              className="w-full py-1.5 text-sm  font-normal rounded-md text-[#333] bg-[#F2F4F8] border border-[#D4D4D4] hover:cursor-pointer hover:bg-[#F1F3F7]"
            >Anuluj</button>
            {/* SAVE BUTTON */}
            <button 
              onClick={handleSave} 
              className="w-full py-1.5 text-sm rounded-md text-white bg-[#111] border border-[#111] hover:cursor-pointer hover:bg-[#000]"
            >Zapisz</button>
          </div>
        </div>
        )}
    </div>
  );
}

