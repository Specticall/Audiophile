import { UseFormRegisterReturn } from "react-hook-form";

export function InputText({
  label,
  placeholder,
  className,
  register,
  errorMessage,
}: {
  label: string;
  placeholder: string;
  className?: string;
  register?: UseFormRegisterReturn;
  errorMessage?: string | undefined;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-2 flex justify-between gap-4">
        <label
          className={`text-label font-bold ${
            errorMessage ? "text-red-500" : "text-black"
          }`}
        >
          {label}
        </label>
        <p className="text-label text-red-500">{errorMessage}</p>
      </div>
      <input
        placeholder={placeholder}
        className={`text-overline py-4 px-6 border-[1px] ${
          errorMessage ? "border-red-500 outline-none" : "border-black/10"
        } rounded-md`}
        {...register}
      />
    </div>
  );
}
