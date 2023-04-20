export const FormControl = (props) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text font-['Croissant_One'] text-lg">{props.label}</span>
            </label>
            <label className="input-group">
                <span className="backdrop-blur bg-accent">{props.icon}</span>
                <input {...props.register(props.name)} type={props.type} placeholder={props.placeholder} defaultValue={props.value} className={`input input-bordered font-['Inconsolata'] w-full text-zinc-50 placeholder:text-zinc-300 bg-zinc-600/25 backdrop-blur ${props.error && "border-red-500"}`} />
            </label>
            <div className="font-['Inconsolata'] text-red-500 ">{props.error?.message}</div>
        </div>
    );
};