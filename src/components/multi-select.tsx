import { useEffect, useState } from "react";
import { MultiSelect as ReactMultiSelect, Option } from "react-multi-select-component"; // using the npm package [^1^][1]
import { useSearchParams } from "react-router-dom";

type Props = {
  keyParam?: string;
  options: Option[];
  onChange?: (selected: Option[]) => void;
  valueRenderer?: (selected: Option[], options: Option[]) => JSX.Element;
  placeholder?: string;
};
const MultiSelect = ({ options, onChange, valueRenderer, placeholder, keyParam }: Props) => {
  const [selected, setSelected] = useState<Option[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (selected: Option[]) => {
    setSearchParams((prev) => {
      if (!keyParam) return prev;
      prev.set(keyParam, selected.map((item) => item.value).join(","));
      return prev;
    });
    setSelected(selected);
    onChange?.(selected);
  };

  useEffect(() => {
    const value = searchParams.get(keyParam || "");
    if (value) {
      const selected = value.split(",").map((item) => ({ label: item, value: item }));
      setSelected(selected);
      onChange?.(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
