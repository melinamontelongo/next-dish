export const Message = (props) => {
    return(
        <div className="text-center font-['Inconsolata'] bg-neutral/25 rounded mx-auto p-2 mb-4 w-fit backdrop-blur shadow-lg">
            {props.children}
        </div>
    )
}