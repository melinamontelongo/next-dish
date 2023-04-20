export const Checkbox = (props) => {
    return (
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text font-['Croissant_One'] text-lg">{props.label}</span>
                <input type="checkbox" className="checkbox checkbox-neutral" />
            </label>
        </div>
    );
};