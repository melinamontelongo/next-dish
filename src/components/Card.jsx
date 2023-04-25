export const Card = ({ image, title, body = "", footer="", clickHandler = undefined, id = undefined }) => {
    return (
        <div className="card bg-primary/50 backdrop-blur drop-shadow-xl md:w-96 shadow-xl m-5 hover:cursor-pointer hover:shadow-lg hover:drop-shadow-lg" onClick={clickHandler}>
            <figure className="px-5 pt-5"><img className="bg-zinc-200 rounded-xl" src={image} alt={title} /></figure>
            <div className="card-body">
                <div className="flex justify-center h-full">
                    <h2 className="card-title font-['Croissant_One']">{title}</h2>
                </div>
                {body}
                <div className="card-actions justify-center">
                    {footer}
                </div>
            </div>
        </div>
    )
};