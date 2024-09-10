export default function InputTemplate({
    type,
    content,
    changeValue,
    setChangeValue,
}) {
    return (
        <>
            <div className="w-72 flex justify-center items-center gap-2 tablet:gap-3">
                <label htmlFor={content} className="p-2 text-base font-bold tablet:text-2xl">
                    {content}
                </label>
                <input
                    id={content}
                    type={type}
                    placeholder={"Enter " + content + " .."}
                    value={changeValue}
                    required
                    onChange={(e) => {
                        setChangeValue(e.target.value);
                    }}
                    className="p-2 border-radius bg-slate-300 tablet:text-xl"
                />
            </div>
        </>
    );
}
