type EditableFieldProps = {
  fieldName: string
  fieldValue?: string
}

export const DashobardSettingInformationField = ({ fieldName, fieldValue,}: EditableFieldProps) =>  {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-main-black text-sm font-medium">{fieldName}</p>
      <p className="text-main-black text-sm font-light">{fieldValue || "Brak"}</p>
    </div>
  )
}

