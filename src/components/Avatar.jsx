export const Avatar = ({ content }) => {
    return (
        <div className="avatar">
            <div className="w-24 rounded-full">
                {content}
            </div>
        </div>
    );
};