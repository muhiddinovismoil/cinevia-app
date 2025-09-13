export const renderDropdown = (
    isOpen: boolean,
    onClose: () => void,
    items: { label: string; value: string }[],
    onSelect: (val: string) => void
) => {
    if (!isOpen) return null;
    const hasMany = items.length > 10;
    return (
        <div
            className={`
    absolute left-0 top-full mt-2 w-full bg-gray-900 text-white 
    rounded-xl shadow-xl z-50 hidden md:block
  `}
        >
            <div
                className={`
      ${
          hasMany
              ? "max-h-[250px] overflow-y-auto dropdown-scroll"
              : "h-auto dropdown-scroll"
      }
    `}
            >
                {items.map((item) => (
                    <div
                        key={item.value}
                        onClick={() => {
                            onSelect(item.value);
                            onClose();
                        }}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-lg transition"
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};
