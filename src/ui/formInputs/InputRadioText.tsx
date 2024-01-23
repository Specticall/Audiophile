import { useEffect, useState } from "react";

export function InputRadioText({
  onSelect = () => {},
  selected,
  label,
}: {
  onSelect?: () => void;
  label: string;
  selected?: boolean;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected((current) => (selected === undefined ? !current : current));
    onSelect();
  };

  useEffect(() => {
    if (selected === undefined) return;
    setIsSelected(selected);
  }, [selected]);

  return (
    <div
      className={`text-overline py-4 px-6 border-[1px]  rounded-md flex gap-4 cursor-pointer ${
        isSelected ? "border-accent-dark" : "border-black/10"
      }`}
      onClick={handleSelect}
    >
      <div className="border-[1px] border-black/20 w-[1.25rem] h-[1.25rem] rounded-full p-[.3rem]">
        {isSelected && (
          <div className="bg-accent-dark w-full h-full rounded-full "></div>
        )}
      </div>
      {label}
    </div>
  );
}
