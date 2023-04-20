export const Button = (props) => {
    return (
        <button type={props.type} onClick={props.clickHandler} className="btn btn-accent font-['Croissant_One'] text-lg normal-case w-full drop-shadow">{props.children}</button>
    );
};