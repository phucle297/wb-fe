import { useState } from "react";
import { MultiSelect as ReactMultiSelect, Option } from "react-multi-select-component"; // using the npm package [^1^][1]

type Props = {
  options: Option[];
  onChange: (selected: Option[]) => void;
  valueRenderer?: (selected: Option[], options: Option[]) => JSX.Element;
  placeholder?: string;
};
const MultiSelect = ({ options, onChange, valueRenderer, placeholder }: Props) => {
  const [selected, setSelected] = useState<Option[]>([]);

  const handleChange = (selected: Option[]) => {
    setSelected(selected);
    onChange(selected);
  };
  return (
    <div className="mb-2 w-full md:w-[250px]">
      <ReactMultiSelect
        className="text-red w-full md:w-[250px]"
        labelledBy="Select"
        options={options}
        value={selected}
        valueRenderer={selected.length > 0 ? valueRenderer : () => <p className="text-sm">{placeholder}</p>}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiSelect;
